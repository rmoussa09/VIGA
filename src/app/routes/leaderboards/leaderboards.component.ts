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
    this.subscription = this.usersService.getTopScores().subscribe(scores => {
      this.topScores = scores;
    });
    
    this.subscription = this.usersService.getTopScores2().subscribe(scores2 => {
      this.topScores2 = scores2;
    });

    this.subscription.add(
      this.usersService.getCurrentUserRank().subscribe(rank => {
        this.currentUserRank = rank;
      })
    );

    this.subscription.add(
      this.usersService.getCurrentUserRank2().subscribe(rank => {
        this.currentUserRank = rank;
      })
    );

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
