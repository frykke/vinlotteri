import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RoundListComponent } from './round-list/round-list.component';
import { DieComponent } from './die/die.component';
import { RoundListItemComponent } from './round-list-item/round-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RoundListComponent,
    DieComponent,
    RoundListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
