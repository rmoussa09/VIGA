import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-splevel',
  templateUrl: './splevel.component.html',
  styleUrls: ['./splevel.component.scss']
})
export class SplevelComponent {
  @Input() level!: number;
  @Input() levelCompleted!: boolean;
  @Output() nextLevelClicked = new EventEmitter();
  @Output() levelSelectClicked = new EventEmitter();
  @Output() returnToMainMenuClicked = new EventEmitter();

  //this sends the user to the next level
  nextLevel() {
    this.nextLevelClicked.emit();
  }
//this sends the user to level select
levelSelect() {
  this.levelSelectClicked.emit();
}
//this sends the user back to the main menu
returnToMainMenu() {
  this.returnToMainMenuClicked.emit();
}

}
