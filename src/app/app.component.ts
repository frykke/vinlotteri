import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SpelareState } from './reducers/spelare.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vinlotteri';
}
