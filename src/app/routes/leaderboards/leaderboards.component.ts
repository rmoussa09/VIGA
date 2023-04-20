import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ProfileUser } from 'src/app/models/user-profile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})

export class LeaderboardsComponent implements OnInit, OnDestroy {
  topScores: ProfileUser[] = [];
  topScores2: ProfileUser[] = [];
  currentUserRank: number | null = null;
  currentUserProfile: ProfileUser | null = null;
  private subscription: Subscription;

  constructor(private usersService: UsersService) {
    this.subscription= new Subscription();
  }

  ngOnInit() {
    //this gets the top scores from speedster
    this.subscription = this.usersService.getTopScores().subscribe(scores => {
      this.topScores = scores;
    });
    
        //this gets the top scores from memory lane
    this.subscription = this.usersService.getTopScores2().subscribe(scores2 => {
      this.topScores2 = scores2;
    });

    //This gets the ranks of the users from speedster
    this.subscription.add(
      this.usersService.getCurrentUserRank().subscribe(rank => {
        this.currentUserRank = rank;
      })
    );
    //This gets the ranks of the users from memory lane

    this.subscription.add(
      this.usersService.getCurrentUserRank2().subscribe(rank => {
        this.currentUserRank = rank;
      })
    );
//this makes the current profile into the profile section
    this.subscription.add(
      this.usersService.currentUserProfile$.subscribe(profile => {
        this.currentUserProfile = profile;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
