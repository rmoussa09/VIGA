import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  user$ = this.usersService.currentUserProfile$;
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public authService: AuthenticationService, 
    public usersService: UsersService, 
    private router: Router) {}

    //this logouts the user using firebase
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
