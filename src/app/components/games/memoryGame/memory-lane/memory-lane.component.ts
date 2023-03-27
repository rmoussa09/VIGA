import { Component, HostListener } from '@angular/core';

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
export class MemoryLAneComponent {
  gameStarted = false;
  gameOver = false;
  levelWon = false;
  score = 0;
  index = 0;
  level = 0;
  currentCommand!: Command;
  commands = [Command.UP, Command.DOWN, Command.LEFT, Command.RIGHT];
  stringCommands = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
  memory: Command[] = [];

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
    this.getRandomCommand();
    this.showNextCommand();
    this.gameStarted = true;
    this.score = 0;
    this.index = 0;
  }

  playAgain() {
    this.gameOver = false;
    this.startGame();
  }

  showNextCommand() {
    this.currentCommand = this.memory[this.index];
    this.index++;
    this.checkLevel();
  }

  getRandomCommand() {
    const index = Math.floor(Math.random() * this.commands.length);
    this.memory.push(this.commands[index]);
  }

  checkCommand(command: Command) {
    if (command === this.memory[this.index]) {
      this.showNextCommand();
      this.score++;
    } else {
      this.endGame();
    }
  }

  checkLevel() {
    if (this.index > this.level) {
      this.level = this.index;
    }
  }
  
  endGame() {
    this.gameOver = true;
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
}
