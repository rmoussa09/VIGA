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
    this.levelSelectedVisible = false;
    this.startLevel();
  }

  startLevel() {
    this.gameStarted = true;
    this.gameOver = false;
    this.levelCompleted = false;
    this.score = 0;
    this.timeLeft = 0;
    this.COMMAND_TIME_LIMIT = 16000 - this.currentLevel * 1000;
    this.timer = setInterval(() => {
      this.timeLeft += 100;
      if (this.timeLeft >= this.COMMAND_TIME_LIMIT) {
        this.endGame();
      }
    }, 100);
    this.showNextCommand();
  }
  

  playAgain() {
    this.startLevel();
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
  

  levelSelect(level: number) {
    this.currentLevel = level;
    this.startLevel();
  }

  levelSelected(level: number) {
    this.currentLevel = level;
    this.levelSelectedVisible = true;
    this.gameStarted = false;
  }

  displayLevelSelectScreen() {
    this.displayLevelSelect = true;
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
      this.checkLevelCompletion();
      this.showNextCommand();
    } else {
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.timer);
    const levelScoreRequirement = 5 * this.currentLevel + 2;
    if (this.score >= levelScoreRequirement) {
      this.levelCompleted = true;
      this.displayLevelSelectScreen();
    } else {
      this.levelCompleted = false;
      this.gameOver = true;
    }
  }
  
  checkLevelCompletion() {
    const levelScoreRequirement = 5 * this.currentLevel + 2;
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
