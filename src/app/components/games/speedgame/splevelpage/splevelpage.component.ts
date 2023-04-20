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

  startLevel() {
    this.startLevelClicked.emit();
  }

  levelSelected(level: number) {
    this.levelSelect.emit(level);
  }

  returnToMainMenu() {
    this.returnToMainMenuClicked.emit();
  }
  
}
