import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mltitle',
  templateUrl: './mltitle.component.html',
  styleUrls: ['./mltitle.component.scss']
})
export class MltitleComponent {
  @Output() startGameClicked = new EventEmitter();
  @Output() endlessStartGameClicked = new EventEmitter();

//this sends information to the main component that this is a normal level based game
  startGame() {
    this.startGameClicked.emit();
  }

  //this sends information to the main component that this is a endless based game

  endlessStartGame(){
    this.endlessStartGameClicked.emit();
  }
}
