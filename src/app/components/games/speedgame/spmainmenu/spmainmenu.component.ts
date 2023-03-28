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

  enterLevelMode() {
    this.levelModeClicked.emit();
  }

  enterEndlessMode() {
    this.endlessModeClicked.emit();
  }

  exitGame() {
    this.exitGameClicked.emit();
  }
}


