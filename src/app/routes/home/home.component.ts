import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
//this makes the user$ into the current user that is logged in
  user$ = this.authService.currentUser$;

  constructor(private authService: AuthenticationService) { }
  
  ngOnInit(): void {

  }
}
