import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuessanimalComponent } from './guessanimal/guessanimal.component';

// Main Routing Toolbar
@NgModule({
    declarations: [
        AppComponent,
        routingComponents,
        GuessanimalComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ]
})
export class AppModule { }
