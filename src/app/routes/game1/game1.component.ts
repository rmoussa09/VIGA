import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-game1',
  templateUrl: './game1.component.html',
  styleUrls: ['./game1.component.scss']
})
export class Game1Component {
  @ViewChild('name') nameKey!: ElementRef;


  startQuiz(){
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }
}
