import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { SplevelpageComponent } from '../splevelpage/splevelpage.component';
import { UsersService } from 'src/app/services/users.service';
import { first } from 'rxjs/operators';

export enum Command {
  UP = 'Up',
  DOWN = 'Down',
  LEFT = 'Left',
  RIGHT = 'Right'
}

@Component({
  selector: 'app-speedster',
  templateUrl: './speedster.component.html',
  styleUrls: ['./speedster.component.scss'],
  entryComponents: [SplevelpageComponent]
})
export class SpeedsterComponent {
  public COMMAND_TIME_LIMIT = 10000; // 10 seconds

  gameStarted = false;
  gameOver = false;
  levelCompleted = false;
  level = 1;
  score = 0;
  displayLevelSelect = false;
  currentLevel = 1;
  levelSelectedVisible = false;
  mainMenuVisible = false;
  currentCommand!: Command;
  commands = [Command.UP, Command.DOWN, Command.LEFT, Command.RIGHT];
  repeatAudioTimeout: any[] = [];
  currentAudio: HTMLAudioElement | null = null;

  timer!: any;
  timeLeft!: number;

  
  constructor(private location: Location, private usersService: UsersService) {}

  // Listening to the keydown event and checking if the pressed key is a valid command
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.gameStarted && !this.gameOver) {
      const command = this.getCommandFromKey(event.key);
      if (command) {
        this.checkCommand(command);
        event.preventDefault();
      }
    }
  }


  // Method to start the game and reset the required variables
  startGame() {
    this.level = 1;
    this.currentLevel = -1;
    this.levelSelectedVisible = false;
    this.mainMenuVisible = true;
    this.displayLevelSelect = false;
    this.gameStarted = false;
  }

  // Method to show the level select screen and hide other screens
  displayLevelSelectScreen() {
    this.displayLevelSelect = true;
    this.mainMenuVisible = false;
    this.gameStarted = false;
  }

  // Method to start the endless mode and set the initial values
  startEndlessMode() {
    this.gameStarted = true;
    this.gameOver = false;
    this.levelCompleted = false;
    this.score = 0;
    this.timeLeft = 0;
    this.COMMAND_TIME_LIMIT = 10000; // 10 seconds
    this.currentLevel = -1; // Set to -1 to indicate endless mode
    this.startLevel();
  }
  
  // Method to exit the game and reset the required variables

  exitGame() {
    this.gameStarted = false;
    this.gameOver = false;
    this.levelCompleted = false;
    this.displayLevelSelect = false;
    this.mainMenuVisible = false;
  }

  // Method to start a new level and set the required values

  startLevel() {
    this.gameStarted = true;
    this.gameOver = false;
    this.levelCompleted = false;
    if (this.currentLevel !== -1) { // Check if not in endless mode
      this.COMMAND_TIME_LIMIT = 12000 - this.currentLevel * 1000;
    }
    this.timer = setInterval(() => {
      this.timeLeft += 100;
      if (this.timeLeft >= this.COMMAND_TIME_LIMIT) {
        this.endGame();
      }
    }, 100);
    this.showNextCommand();
  }
  
  playAgain() {
    if (this.currentLevel === -1) { // Endless mode
      this.COMMAND_TIME_LIMIT = 10000; // 10 seconds
    }
    this.score = 0;
    this.startLevel();
  }

    //this takes the user back to the main menu

  returnToMainMenu() {
    this.gameOver = false;
    this.gameStarted = false;
    this.mainMenuVisible = true;
    this.displayLevelSelect = false;
  }

    //this takes the user to the next level

  nextLevel() {
    this.currentLevel++;
    this.levelCompleted = false;
    this.gameOver = false;
    this.score = 0;
    this.timeLeft = 0;
    this.COMMAND_TIME_LIMIT = 16000 - this.currentLevel * 1000;
    this.startLevel();
  }
  
//sends the user to level select screen
  levelSelect() {
    this.gameStarted = false;
    this.displayLevelSelect = true;
    this.levelCompleted = false;
  }

  //chooses the level that the user will select
  levelSelected(level: number) {
    this.currentLevel = level;
    this.levelSelectedVisible = true;
    this.gameStarted = false;
    this.score = 0;
  }

  //shows the next command on the screen
  showNextCommand() {
    if (this.repeatAudioTimeout) {
      this.repeatAudioTimeout.forEach((timeout: any) => clearTimeout(timeout));
    }
    this.currentCommand = this.getRandomCommand();
    this.playCommandAudio(this.currentCommand);
    this.timeLeft = 0;
  }
  
  
//gets a random command to add to the command list
  getRandomCommand(): Command {
    const index = Math.floor(Math.random() * this.commands.length);
    return this.commands[index];
  }

  //this checks to see if the command is correct
  checkCommand(command: Command) {
    if (command === this.currentCommand) {
      this.score++;
  
      if (this.currentLevel === -1) { // Endless mode
        if (this.score % 5 === 0) {
          this.COMMAND_TIME_LIMIT = Math.max(2000, this.COMMAND_TIME_LIMIT - 1000);
        }
      } else {
        this.checkLevelCompletion();
      }
      this.showNextCommand();
    } else {
      this.endGame();
    }
  }
  
  //this sends the user to the level mode
  enterLevelMode() {
    this.resetGameState();
    this.displayLevelSelectScreen();
  }
  
  //this sends the user to the game state
  resetGameState() {
    this.gameStarted = false;
    this.levelCompleted = false;
  }
  
  //this is the end of the game for the user
  endGame() {
    clearInterval(this.timer);
    this.stopCurrentAudio();
    this.clearRepeatAudioTimeouts();
    if (this.currentLevel === -1) { // Endless mode
      this.gameOver = true;
      this.levelCompleted = false;
  
      // Update user's score if it's a new high score in endless mode
      this.usersService.currentUserProfile$.pipe(first()).subscribe(user => {
        if (user && (!user.speedsterScore || this.score > user.speedsterScore)) {
          user.speedsterScore = this.score;
          if (this.score >= 25) {
            user.speedsterScore25 = true;
          }
          this.usersService.updateUser(user).subscribe();
        }
      });
    } else {
      const levelScoreRequirement = (this.currentLevel + this.currentLevel);
      if (this.score >= levelScoreRequirement) {
        this.levelCompleted = true;
        this.displayLevelSelectScreen();
        this.usersService.currentUserProfile$.pipe(first()).subscribe(user => {
          if (user && (this.currentLevel == 10)) {
            user.finishSpeedster = true;
            this.usersService.updateUser(user).subscribe();
          }
        });
      } else {
        this.levelCompleted = false;
        this.gameOver = true;
      }
    }
  }
  
  
  //this checks to see if the level was completed
  checkLevelCompletion() {
    const levelScoreRequirement = (this.currentLevel  + this.currentLevel);
    if (this.score >= levelScoreRequirement) {
      this.endGame();
    }
  }
  
  //this checks to see if the key clicked is the same as the one in the commandlist
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

  //This gets the image next to command
  getCommandImage(): string {
    const imagePath = 'assets/speedgame/';
    switch (this.currentCommand) {
      case Command.UP:
        return imagePath + 'up.png';
      case Command.DOWN:
        return imagePath + 'down.png';
      case Command.LEFT:
        return imagePath + 'left.png';
      case Command.RIGHT:
        return imagePath + 'right.png';
      default:
        return '';
    }
  }  
 
  //this adds the play to the command audio
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
  
    const audio = new Audio(`${audioPath}${audioFile}`);
    this.playAudioWithRepeats(audio, command, 3, 2);
  }
  
  playAudioWithRepeats(audio: HTMLAudioElement, command: Command, delay: number, repeats: number) {
    //Stops audio from playing when on next game phase
    if (this.isGameOverOrLevelCompleted()) {
      return;
    }

    //Play initial audio
    audio.play();
  
    //Update Audio
    this.currentAudio = audio;

    //Clear previous repeat audio timeouts
    if (this.repeatAudioTimeout) {
      this.repeatAudioTimeout.forEach((timeout: any) => clearTimeout(timeout));
    }
  
    this.repeatAudioTimeout = [];
  
    //Schedule repeat audios
    for (let i = 1; i <= repeats; i++) {
      const timeout = setTimeout(() => {
        if (command === this.currentCommand && this.timeLeft <= this.COMMAND_TIME_LIMIT - delay * i) {
          audio.play();
        }
      }, delay * i * 1000);
  
      this.repeatAudioTimeout.push(timeout);
    }
  }

  //checks if the game is over or level is completed
  isGameOverOrLevelCompleted(): boolean {
    return this.gameOver || this.levelCompleted;
  }
  
  //this repeats the audio once they are the screen for a period of time
  clearRepeatAudioTimeouts() {
    if (this.repeatAudioTimeout) {
      this.repeatAudioTimeout.forEach((timeout: any) => clearTimeout(timeout));
      this.repeatAudioTimeout = [];
    }
  }

  //this stops the audio once they get to the next screen
  stopCurrentAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
  }
}
