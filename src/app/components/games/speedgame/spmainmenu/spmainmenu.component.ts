import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-spmainmenu',
  templateUrl: './spmainmenu.component.html',
  styleUrls: ['./spmainmenu.component.scss']
})
export class SpmainmenuComponent {
  @Output() levelModeClicked = new EventEmitter();
  @Output() endlessModeClicked = new EventEmitter();
  @Output() exitGameClicked = new EventEmitter();

  //this sends the user to the level game mode
  enterLevelMode() {
    this.levelModeClicked.emit();
  }
//this sends the user to the endless based game mode
  enterEndlessMode() {
    this.endlessModeClicked.emit();
  }
//this exits the game
  exitGame() {
    this.exitGameClicked.emit();
  }
}


