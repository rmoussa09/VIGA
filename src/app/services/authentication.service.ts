import { Injectable } from '@angular/core';
import { Auth, authState, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { from, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password))
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

}
