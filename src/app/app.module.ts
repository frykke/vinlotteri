import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RoundListComponent } from './round-list/round-list.component';
import { DieComponent } from './die/die.component';
import { RoundListItemComponent } from './round-list-item/round-list-item.component';
import { DiceComponent } from './dice/dice.component';
import { Die3dComponent } from './die3d/die3d.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/spelare.reducer';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RoundListComponent,
    DieComponent,
    RoundListItemComponent,
    DiceComponent,
    Die3dComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
