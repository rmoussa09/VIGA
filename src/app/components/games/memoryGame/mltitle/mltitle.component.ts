import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mltitle',
  templateUrl: './mltitle.component.html',
  styleUrls: ['./mltitle.component.scss']
})
export class MltitleComponent {
  @Output() startGameClicked = new EventEmitter();
  @Output() endlessStartGameClicked = new EventEmitter();


  startGame() {
    this.startGameClicked.emit();
  }

  endlessStartGame(){
    this.endlessStartGameClicked.emit();
  }
}
