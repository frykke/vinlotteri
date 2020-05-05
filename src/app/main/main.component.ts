import { Component, OnInit } from '@angular/core';
import { Spelare } from '../models/spelare';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';
import { Store } from '@ngrx/store';
import { SpelareState, selectAllSpelares, selectSpelareTotal } from '../reducers/spelare.reducer';
import { Observable } from 'rxjs';
import { addPlayer, removePlayer } from '../actions/spelare.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  spelare: Observable<Spelare[]>;
  antalSpelare: number;
  constructor(
    private gameService: GameService,
    private store: Store<SpelareState>
  ) {
      this.spelare = store.select(selectAllSpelares);
      store.select(selectSpelareTotal).subscribe((antal) => this.antalSpelare = antal);
  }

  public game: Game;
  public myList: Spelare[] = [];
  public dice = null;
  public rolling = false;
  public next = this.myList[0];
  public stake: 'higher' | 'lower' | 'same' | '' = '';
  public muted = false;
  ngOnInit() {
    this.gameService.newGame();
    this.gameService.getGame().subscribe((game) => this.game = game);
  }
  roll(stake: 'higher' | 'lower' | 'same') {
    this.rolling = true;
    this.stake = stake;
    setTimeout(() => {
      this.rolling = false;
      this.stake = '';
      this.gameService.roll(stake);
      }, this.muted ? 1000 : 2000);
  }
  onClickLower() {
    this.roll('lower');
  }
  onClickHigher() {
    this.roll('higher');

  }
  onClickSame() {
    this.roll('same');
  }
  adderaSpelare() {
    const nySpelare: Spelare = { id: this.antalSpelare + 1, namn: 'Spelare ' + (this.antalSpelare + 1), liv: 2 };
    this.store.dispatch(addPlayer({spelare: nySpelare}));
    this.gameService.adderaSpelare();
  }
  tabortSpelare(spelare: Spelare) {
    this.store.dispatch(removePlayer({spelareId: spelare.id}));
    this.gameService.tabortSpelare(spelare);
  }
  resetGame() {
    this.gameService.resetGame();
  }
  onClickSpeaker() {
    this.muted = !this.muted;
  }
}
