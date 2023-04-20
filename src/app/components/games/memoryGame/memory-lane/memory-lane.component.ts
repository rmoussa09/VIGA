import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

enum Command {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

@Component({
  selector: 'app-memory-lane',
  templateUrl: './memory-lane.component.html',
  styleUrls: ['./memory-lane.component.scss']
})
export class MemoryLAneComponent implements OnInit {
  gameStarted = false;
  gameOver = false;
  levelWon = false;
  chickenwinner = false;
  endless = false;
  score = 0;
  index = 0;
  i = 0;
  maxLevel = 11;
  level = 0;
  id: any;
  commands = [Command.UP, Command.DOWN, Command.LEFT, Command.RIGHT];
  stringCommands = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
  memory: Command[] = [];
  commandList = '';
  currentAudio: HTMLAudioElement | null = null;
  shouldPlayAudio: boolean = false;

  constructor(private usersService: UsersService) {}

  //This allows for the user to use keys
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.gameStarted && !this.isGameOverOrLevelCompleted()) {
      const command = this.getCommandFromKey(event.key);
      if (command) {
        this.checkCommand(command);
        event.preventDefault();
      }
    }
  }

  ngOnInit() {
    this.shouldPlayAudio = true;
    this.playAllCommands();
  }

//this is the start of the main level based game
  startGame() {
    this.checkLevel();
    this.getRandomCommand();
    this.updateCommandList();
    this.showNextCommand();
    this.gameStarted = true;
    this.score = 0;
    this.index = 0;
    this.playCommandAudio(this.memory[0]);
  }

//This is the start of the endless mode of the game
  startEndlessGame() {
    this.checkLevel();
    this.getRandomCommand();
    this.updateCommandList();
    this.showNextCommand();
    this.gameStarted = true;
    this.endless = true;
    this.score = 0;
    this.index = 0;
    this.playCommandAudio(this.memory[0]);
  }

//this is a continuation of the startGame method without adding another command before
continueGame() {
    this.checkLevel();
    this.showNextCommand();
    this.checkIfEndGame();
    this.score = 0;
    this.index = 0;
    this.i = 0;
  }
//this is a continuation of the startEndless method without adding another command before
  continueEndless(){
    this.checkLevel();
    this.showNextCommand();
    this.score = 0;
    this.index = 0;
  }

  //This is used to reset and continue the game
  retryGame() {
    this.checkLevel();
    this.showNextCommand();
    this.score = 0;
    this.index = 0;
  }

  //this gives a random command in the array
  getRandomCommand() {
    const index = Math.floor(Math.random() * this.commands.length);
    this.memory.push(this.commands[index]);
    this.updateCommandList();
  }

  //this updates the command list in order to have the updated commands
  updateCommandList() {
    this.commandList = this.memory.map(command => command.toLowerCase()).join(', ');
  }

  //This shows the next command on the screen
  showNextCommand() {
    this.index++;
    this.checkLevel();
  }

// this checks if the key clicked is the same as the one in the commandlist
  checkCommand(command: Command) {
    if (command === this.memory[this.index]) {
      this.showNextCommand();
      this.score++;
      this.checkIfWon();
    } else {
      this.endGame();
    }
  }
//This checks to see if the level is correct
  checkLevel() {
    if (this.index > this.level) {
      this.level = this.index;
    }
  }

//This checks to see if the user won
  checkIfWon() {
    if (this.score === this.memory.length) {
      this.levelWon = true;
      this.getRandomCommand();
      this.updateCommandList();
      this.playAllCommands();
    }
  }

//this plays the audio on the files for the user to use
  playAudio(startIndex: number = 0) {
    if (this.shouldPlayAudio) {
      if (this.i < this.memory.length) {
        this.playCommandAudio(this.memory[this.i]);
        this.i++;
  
        setTimeout(() => {
          this.playAudio(startIndex);
        }, 1000);
      } else {
        this.i = startIndex;
        this.shouldPlayAudio = false;
      }
    }
  }

  playAgain() {
// Stop the current playing audio if there is one
if (this.currentAudio) {
  this.currentAudio.pause();
  this.currentAudio.currentTime = 0;
}
this.gameOver = false;
this.levelWon = false;
this.shouldPlayAudio = true;
if (this.endless === false) {
  this.continueGame();
    }

    else if(this.endless === true){
      this.continueEndless();
      this.usersService.currentUserProfile$.pipe(first()).subscribe(user => {
        if (user && (!user.memoryLaneScore || this.level > user.memoryLaneScore)) {
          user.memoryLaneScore = this.level;

          // Update Endless Mode Achievement
          if (this.level >= 10) {
            user.memoryLaneScore10 = true;
          }

  this.usersService.updateUser(user).subscribe();
        }
      });
    }
  }

//this allows for the user to continue after losing.
  tryAgain() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.gameOver = false;
    this.levelWon = false;
    this.retryGame();
  }

  endGame() {
    // Stop the current playing audio if there is one
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
    this.gameOver = true;
    this.playAllCommands();
  }

  //this takes the user back to the main menu
  exitGame(){
    this.gameOver = false;
    this.levelWon = false;
    this.gameStarted = false;
    this.chickenwinner = false;
    this.memory = [];
    this.index=0;
    this.level=0;
  }

//this checks to see if the game was ended
  checkIfEndGame() {
    if (this.level === this.maxLevel) {
      this.chickenwinner = true;
      this.gameStarted = false;
      this.usersService.currentUserProfile$.pipe(first()).subscribe(user => {
        if (user && (this.level === this.maxLevel)) {
          user.finishMemoryLane = true;
          this.usersService.updateUser(user).subscribe();
        }
      });
    }
  }

//checks if game is over or the game is won
  isGameOverOrLevelCompleted(): boolean {
    return this.gameOver || this.levelWon || this.chickenwinner;
  }

  //this binds the keys to the command in the game
  getCommandFromKey(key: string): Command | undefined {
    switch (key.toLowerCase()) {
      case 'arrowup':
        return Command.UP;
      case 'arrowdown':
        return Command.DOWN;
      case 'arrowleft':
        return Command.LEFT;
      case 'arrowright':
        return Command.RIGHT;
      default:
        return undefined;
    }
  }

  //this binds the command to the audio file that says the direction
  playCommandAudio(command: Command) {
    const audioPath = 'assets/speedgame/audio/';
    let audioFile = '';
  
  switch (command) {
    case Command.UP:
      audioFile = 'up.mp3';
      break;
    case Command.DOWN:
      audioFile = 'down.mp3';
      break;
    case Command.LEFT:
      audioFile = 'left.mp3';
      break;
    case Command.RIGHT:
      audioFile = 'right.mp3';
      break;
    default:
      return;
  }
  // Stop the current playing audio if there is one
  if (this.currentAudio) {
    this.currentAudio.pause();
    this.currentAudio.currentTime = 0;
  }

  // Play the new audio
  this.currentAudio = new Audio(`${audioPath}${audioFile}`);
  this.currentAudio.play();
}

//this plays the audio files on the screens for the user to memorize
playAllCommands() {
  if (this.shouldPlayAudio) {
    if (this.i < this.memory.length) {
      this.playCommandAudio(this.memory[this.i]);
      this.i++;

      setTimeout(() => {
        this.playAllCommands();
      }, 1000);
    } else {
      this.i = 0;
    }
  }
}
}


