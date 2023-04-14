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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
