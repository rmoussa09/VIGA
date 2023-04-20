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
export class MemoryLAneComponent{
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

  //this is only called if you are in the original level
  continueGame() {
    this.checkLevel();
    this.showNextCommand();
    this.checkIfEndGame();
    this.score = 0;
    this.index = 0;
    this.i = 0;
  }

  continueEndless(){
    this.checkLevel();
    this.showNextCommand();
    this.score = 0;
    this.index = 0;
  }

  retryGame() {
    this.checkLevel();
    this.showNextCommand();
    this.score = 0;
    this.index = 0;
  }

  getRandomCommand() {
    const index = Math.floor(Math.random() * this.commands.length);
    this.memory.push(this.commands[index]);
    this.updateCommandList();
  }

  updateCommandList() {
    this.commandList = this.memory.map(command => command.toLowerCase()).join(', ');
  }

  showNextCommand() {
    this.index++;
    this.checkLevel();
  }

  checkCommand(command: Command) {
    if (command === this.memory[this.index]) {
      this.showNextCommand();
      this.score++;
      this.checkIfWon();
    } else {
      this.endGame();
    }
  }

  checkLevel() {
    if (this.index > this.level) {
      this.level = this.index;
    }
  }

  checkIfWon() {
    if (this.score === this.memory.length) {
      this.levelWon = true;
      this.getRandomCommand();
      this.updateCommandList();
      this.playAllCommands();
    }
  }

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

  exitGame(){
    this.gameOver = false;
    this.levelWon = false;
    this.gameStarted = false;
    this.chickenwinner = false;
    this.memory = [];
    this.index=0;
    this.level=0;
  }

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

  isGameOverOrLevelCompleted(): boolean {
    return this.gameOver || this.levelWon || this.chickenwinner;
  }

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


