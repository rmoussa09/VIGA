import { Component, OnInit,ViewChild,ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss', 
            './../../../../../assets/bootstrap.css']
})
export class WelcomeComponent {
  //@ViewChild('name') nameKey!: ElementRef;
  @Output() startGameClicked = new EventEmitter();

  startQuiz() {
    this.startGameClicked.emit();
  }

  constructor() { }

  /*startQuiz(){
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }*/
}
