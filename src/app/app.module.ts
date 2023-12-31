import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { MatMenuModule } from '@angular/material/menu';
import { HotToastModule } from '@ngneat/hot-toast';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { MltitleComponent } from './components/games/memoryGame/mltitle/mltitle.component';
import { SptitleComponent } from './components/games/speedgame/sptitle/sptitle.component';
import { ChangeBgDirective } from './directives/change-bg.directive';
import { HttpClientModule } from '@angular/common/http';
import { SpeedsterComponent } from './components/games/speedgame/speedster/speedster.component';
import { MemoryLAneComponent } from './components/games/memoryGame/memory-lane/memory-lane.component';
import { SplevelComponent } from './components/games/speedgame/splevel/splevel.component';
import { SplevelpageComponent } from './components/games/speedgame/splevelpage/splevelpage.component';
import { LeaderboardsComponent } from './routes/leaderboards/leaderboards.component';
import { SpmainmenuComponent } from './components/games/speedgame/spmainmenu/spmainmenu.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MltitleComponent,
    SptitleComponent,
    ChangeBgDirective,
    SpeedsterComponent,
    MemoryLAneComponent,
    SplevelComponent,
    SplevelpageComponent,
    LeaderboardsComponent,
    SpmainmenuComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    HotToastModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
