import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-splevel',
  templateUrl: './splevel.component.html',
  styleUrls: ['./splevel.component.scss']
})
export class SplevelComponent {
  @Input() level!: number;
  @Input() levelCompleted!: boolean;
  @Output() startLevelClicked = new EventEmitter();
  @Output() nextLevelClicked = new EventEmitter();
  @Output() levelSelectClicked = new EventEmitter();

  startLevel() {
    this.startLevelClicked.emit();
  }

  nextLevel() {
    this.nextLevelClicked.emit();
  }

  levelSelect() {
    this.levelSelectClicked.emit();
  }
}
