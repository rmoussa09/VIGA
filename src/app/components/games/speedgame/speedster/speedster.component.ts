import { Component, HostListener } from '@angular/core';

import { SplevelpageComponent } from '../splevelpage/splevelpage.component';

enum Command {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  SPACE = 'space'
}

@Component({
  selector: 'app-speedster',
  templateUrl: './speedster.component.html',
  styleUrls: ['./speedster.component.scss'],
  entryComponents: [SplevelpageComponent]
})
export class SpeedsterComponent {
  public COMMAND_TIME_LIMIT = 15000; // 15 seconds

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
  commands = [Command.UP, Command.DOWN, Command.LEFT, Command.RIGHT, Command.SPACE];

  timer!: any;
  timeLeft!: number;

  
  constructor() {}

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

  startGame() {
    this.level = 1;
    this.currentLevel = -1;
    this.levelSelectedVisible = false;
    this.mainMenuVisible = true;
    this.displayLevelSelect = false;
    this.gameStarted = false;
  }

  displayLevelSelectScreen() {
    this.displayLevelSelect = true;
    this.mainMenuVisible = false;
    this.gameStarted = false;
  }

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
  
  exitGame() {
    this.gameStarted = false;
    this.gameOver = false;
    this.levelCompleted = false;
    this.displayLevelSelect = false;
    this.mainMenuVisible = false;
  }

  startLevel() {
    this.gameStarted = true;
    this.gameOver = false;
    this.levelCompleted = false;
    if (this.currentLevel !== -1) { // Check if not in endless mode
      this.COMMAND_TIME_LIMIT = 16000 - this.currentLevel * 1000;
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
    this.score = 0;
    this.startLevel();
  }

  returnToMainMenu() {
    this.gameOver = false;
    this.gameStarted = false;
    this.mainMenuVisible = true;
    this.displayLevelSelect = false;
  }

  nextLevel() {
    this.currentLevel++;
    this.levelCompleted = false;
    this.gameOver = false;
    this.score = 0;
    this.timeLeft = 0;
    this.COMMAND_TIME_LIMIT = 16000 - this.currentLevel * 1000;
    this.startLevel();
  }
  

  levelSelect() {
    this.gameStarted = false;
    this.displayLevelSelect = true;
    this.levelCompleted = false;
  }

  levelSelected(level: number) {
    this.currentLevel = level;
    this.levelSelectedVisible = true;
    this.gameStarted = false;
  }

  showNextCommand() {
    this.currentCommand = this.getRandomCommand();
    this.timeLeft = 0;
  }

  getRandomCommand(): Command {
    const index = Math.floor(Math.random() * this.commands.length);
    return this.commands[index];
  }

  checkCommand(command: Command) {
    if (command === this.currentCommand) {
      this.score++;
  
      if (this.currentLevel === -1) { // Endless mode
        if (this.score % 5 === 0) {
          this.COMMAND_TIME_LIMIT = Math.max(3000, this.COMMAND_TIME_LIMIT - 1000);
        }
      } else {
        this.checkLevelCompletion();
      }
      this.showNextCommand();
    } else {
      this.endGame();
    }
  }
  

  endGame() {
    clearInterval(this.timer);
    if (this.currentLevel === -1) { // Endless mode
      this.gameOver = true;
      this.levelCompleted = false;
    } else {
      const levelScoreRequirement = (this.currentLevel + this.currentLevel);
      if (this.score >= levelScoreRequirement) {
        this.levelCompleted = true;
        this.displayLevelSelectScreen();
      } else {
        this.levelCompleted = false;
        this.gameOver = true;
      }
    }
  }
  
  checkLevelCompletion() {
    const levelScoreRequirement = (this.currentLevel  + this.currentLevel);
    if (this.score >= levelScoreRequirement) {
      this.endGame();
    }
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
      case ' ':
        return Command.SPACE;
      default:
        return undefined;
    }
  }
}
