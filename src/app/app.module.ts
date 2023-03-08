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
import { GuessanimalComponent } from './components/games/animalGame/guessanimal/guessanimal.component';
import { Gameborder1Component } from './components/gameborder1/gameborder1.component';
import { Gameborder2Component } from './components/gameborder2/gameborder2.component';
import { Gameborder3Component } from './components/gameborder3/gameborder3.component';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { GATitleComponent } from './components/games/animalGame/gatitle/gatitle.component';
import { GaquestionComponent } from './components/games/animalGame/gaquestion/gaquestion.component';
import { GachoicesComponent } from './components/games/animalGame/gachoices/gachoices.component';
import { MltitleComponent } from './components/games/memoryGame/mltitle/mltitle.component';
import { SptitleComponent } from './components/games/speedgame/sptitle/sptitle.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    GuessanimalComponent,
    Gameborder1Component,
    Gameborder2Component,
    Gameborder3Component,
    GATitleComponent,
    GaquestionComponent,
    GachoicesComponent,
    MltitleComponent,
    SptitleComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
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
