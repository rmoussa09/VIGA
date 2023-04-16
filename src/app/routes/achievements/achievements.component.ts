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

  // Finish Memory Lane
  finishMemoryLane = false;
  finishMemoryLaneProgress = 0;

  // Memory Lane Endless Mode
  memoryLaneScore10 = false;
  memoryLaneScore10Progress = 0;

  // Finish Speedster
  finishSpeedster = false;
  finishSpeedsterProgress = 0;

  // Speedster Endless Mode
  speedsterScore25 = false;
  speedsterScore25Progress = 0;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.subscribe(userProfile => {
      this.currentUserProfile = userProfile;
      if (userProfile) {
        this.finishMemoryLane = userProfile.finishMemoryLane || false;
        this.finishMemoryLaneProgress = userProfile.finishMemoryLane ? 100 : 0;

        this.memoryLaneScore10 = userProfile.memoryLaneScore10 || false;
        this.memoryLaneScore10Progress = userProfile.memoryLaneScore ? (userProfile.memoryLaneScore / 10) * 100 : 0;

        this.finishSpeedster = userProfile.finishSpeedster || false;
        this.finishSpeedsterProgress = userProfile.finishSpeedster ? 100 : 0;

        this.speedsterScore25 = userProfile.speedsterScore25 || false;
        this.speedsterScore25Progress = userProfile.speedsterScore ? (userProfile.speedsterScore / 25) * 100 : 0;
      }
    });
  }
}
