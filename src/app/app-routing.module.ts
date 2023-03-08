import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './routes/home/home.component';
import { Game1Component } from './routes/game1/game1.component';
import { Game2Component } from './routes/game2/game2.component';
import { Game3Component } from './routes/game3/game3.component';
import { RegisterComponent } from './routes/register/register.component';
import { LoginComponent } from './routes/login/login.component';
import { AboutusComponent } from './routes/aboutus/aboutus.component';
import { ContactComponent } from './routes/contact/contact.component';
import { EditprofileComponent } from './routes/editprofile/editprofile.component';
import { AchievementsComponent } from './routes/achievements/achievements.component';
import { WelcomeComponent } from './components/games/animalGame/welcome/welcome.component';
import { QuestionComponent } from './components/games/animalGame/question/question.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'game1', component: Game1Component},
  {path: 'game2', component: Game2Component},
  {path: 'game3', component: Game3Component},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'editprofile', component: EditprofileComponent},
  {path: 'achievements', component: AchievementsComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'question', component: QuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, Game1Component, Game2Component, Game3Component,RegisterComponent, LoginComponent, AboutusComponent, LoginComponent, EditprofileComponent, AchievementsComponent, WelcomeComponent, QuestionComponent]
