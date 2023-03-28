import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-splevelpage',
  templateUrl: './splevelpage.component.html',
  styleUrls: ['./splevelpage.component.scss']
}
)


export class SplevelpageComponent {
  @Output() levelSelect = new EventEmitter<number>();

  constructor(){}

  levelSelected(level: number) {
    this.levelSelect.emit(level);
  }

  
}
