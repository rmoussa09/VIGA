import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../models/user-profile';
import { AuthenticationService } from './authentication.service';
import { query, orderBy, limit } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$(): Observable<ProfileUser | null>{
      return this.authService.currentUser$.pipe(
        switchMap(user => {

          if (!user?.uid) {
            return of(null);
          }

          const ref = doc(this.firestore, 'users', user?.uid);
          return docData(ref) as Observable<ProfileUser>;
        }
      )
      )
  }

  constructor(private firestore: Firestore, private authService: AuthenticationService) { }
  
  addUser(user: ProfileUser) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }
  
  updateUser(user: ProfileUser) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }

  getTopScores(): Observable<ProfileUser[]> {
    const scoresRef = collection(this.firestore, 'users');
    const q = query(scoresRef, orderBy('speedsterScore', 'desc'), limit(5));
    return collectionData(q) as Observable<ProfileUser[]>;
  }
  
  updateUserScore(user: ProfileUser, score: number): Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { speedsterScore: score }));
  }
}
