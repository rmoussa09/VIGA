import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sptitle',
  templateUrl: './sptitle.component.html',
  styleUrls: ['./sptitle.component.scss']
})
export class SptitleComponent {
  @Output() startGameClicked = new EventEmitter();

  //this starts the game when the button is clicked
  startGame() {
    this.startGameClicked.emit();
  }
}
