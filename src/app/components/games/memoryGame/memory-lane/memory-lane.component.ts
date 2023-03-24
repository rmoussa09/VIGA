import { Component, HostListener } from '@angular/core';

enum Command {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  SPACE = 'space'
}

@Component({
  selector: 'app-memory-lane',
  templateUrl: './memory-lane.component.html',
  styleUrls: ['./memory-lane.component.scss']
})
export class MemoryLAneComponent {
  gameStarted = false;
  gameOver = false;
  score = 0;
  currentCommand!: Command;
  commands = [Command.UP, Command.DOWN, Command.LEFT, Command.RIGHT, Command.SPACE];
  memory = []

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
    this.gameStarted = true;
    this.score = 0;
    this.showNextCommand();
  }

  playAgain() {
    this.gameOver = false;
    this.startGame();
  }

  showNextCommand() {
    this.currentCommand = this.getRandomCommand();
  }

  getRandomCommand(): Command {
    const index = Math.floor(Math.random() * this.commands.length);
    return this.commands[index];
  }

  checkCommand(command: Command) {
    if (command === this.currentCommand) {
      this.score++;
      this.showNextCommand();
    } else {
      this.endGame();
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
      case ' ':
        return Command.SPACE;
      default:
        return undefined;
    }
  }
}
