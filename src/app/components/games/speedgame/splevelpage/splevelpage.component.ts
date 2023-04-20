import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-splevelpage',
  templateUrl: './splevelpage.component.html',
  styleUrls: ['./splevelpage.component.scss']
}
)


export class SplevelpageComponent {
  @Input() level!: number;
  @Input() levelCompleted!: boolean;
  @Output() levelSelect = new EventEmitter<number>();
  @Output() returnToMainMenuClicked = new EventEmitter();
  @Output() startLevelClicked = new EventEmitter();

  constructor(){}

  //this starts the level for the user
  startLevel() {
    this.startLevelClicked.emit();
  }
//this checks the level selected for the user
  levelSelected(level: number) {
    this.levelSelect.emit(level);
  }
//this sends the user back to the main menu
  returnToMainMenu() {
    this.returnToMainMenuClicked.emit();
  }
  
}
