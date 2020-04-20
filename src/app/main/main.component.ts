import { Component, OnInit } from '@angular/core';
import { Spelare } from '../models/spelare';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private gameService: GameService) { }
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
      }, this.muted ? 2000 : 4000);
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
    this.gameService.adderaSpelare();
  }
  tabortSpelare(spelare: Spelare) {
    this.gameService.tabortSpelare(spelare);
  }
  resetGame() {
    this.gameService.resetGame();
  }
  onClickSpeaker() {
    this.muted = !this.muted;
  }
}
