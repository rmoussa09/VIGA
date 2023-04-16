import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ProfileUser } from 'src/app/models/user-profile';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})

export class AchievementsComponent implements OnInit {
  currentUserProfile: ProfileUser | null = null;
  speedsterScore25 = false;
  speedsterScore25Progress = 0;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.subscribe(userProfile => {
      this.currentUserProfile = userProfile;
      if (userProfile) {
        this.speedsterScore25 = userProfile.speedsterScore25 || false;
        this.speedsterScore25Progress = userProfile.speedsterScore ? (userProfile.speedsterScore / 25) * 100 : 0;
      }
    });
  }
}
