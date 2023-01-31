import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Game1Component } from './game1/game1.component';
import { Game2Component } from './game2/game2.component';
import { Game3Component } from './game3/game3.component';

const routes: Routes = [
  {path: 'game1', component: Game1Component},
  {path: 'game2', component: Game2Component},
  {path: 'game3', component: Game3Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [Game1Component, Game2Component, Game3Component]