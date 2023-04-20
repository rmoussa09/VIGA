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
import { first, map } from 'rxjs/operators';

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
  
    updateDisplayName(user: ProfileUser, name: string): Observable<any>{
    if (user.name) {
    const nameParts = user.name.split(' ');
    user.displayName = nameParts[0];
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { displayName: nameParts }));
    }

    else{
      const ref = doc(this.firestore, 'users', user.uid);
      return from(updateDoc(ref, { displayName: name }));
    }
 }
 
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

  getTopScores2(): Observable<ProfileUser[]> {
    const scoresRef = collection(this.firestore, 'users');
    const q = query(scoresRef, orderBy('memoryLaneScore', 'desc'), limit(5));
    return collectionData(q) as Observable<ProfileUser[]>;
  }
  
  updateUserScore2(user: ProfileUser, score: number): Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { memoryLaneScore: score }));
  }
 
 getCurrentUserRank(): Observable<number | null> {
    return this.currentUserProfile$.pipe(
      switchMap(userProfile => {
        if (!userProfile?.uid) {
          return of(null);
        }

        return this.authService.currentUser$.pipe(
          first(),
          switchMap(user => {
            if (!user?.uid) {
              return of(null);
            }
            
            const scoresRef = collection(this.firestore, 'users');
            const q = query(scoresRef, orderBy('speedsterScore', 'desc'));
            return collectionData(q, {idField: 'uid'}) as Observable<ProfileUser[]>;
          }),
          map(users => {
            if (users) {
              const currentUserIndex = users.findIndex(user => user.uid === userProfile.uid);
              return currentUserIndex !== -1 ? currentUserIndex + 1 : null;
            }
            return null;
          })
        );
      })
    );
  }

  getCurrentUserRank2(): Observable<number | null> {
    return this.currentUserProfile$.pipe(
      switchMap(userProfile => {
        if (!userProfile?.uid) {
          return of(null);
        }

        return this.authService.currentUser$.pipe(
          first(),
          switchMap(user => {
            if (!user?.uid) {
              return of(null);
            }
            
            const scoresRef = collection(this.firestore, 'users');
            const q = query(scoresRef, orderBy('memoryLaneScore', 'desc'));
            return collectionData(q, {idField: 'uid'}) as Observable<ProfileUser[]>;
          }),
          map(users => {
            if (users) {
              const currentUserIndex = users.findIndex(user => user.uid === userProfile.uid);
              return currentUserIndex !== -1 ? currentUserIndex + 1 : null;
            }
            return null;
          })
        );
      })
    );
  }
}
