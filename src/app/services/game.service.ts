import { Injectable, Output, EventEmitter } from '@angular/core';
import { Spelare } from '../models/spelare';
import { DiceService } from './dice.service';
import { Game } from '../models/game';
import { RoundListService } from './round-list.service';
import { Subject, Observable, of } from 'rxjs';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Message } from './message';


const initList: Spelare[] = [{ id: 1, namn: 'Spelare 1', liv: 2 }];

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private diceService: DiceService,
    private roundListService: RoundListService) {
    this.gainedLife$.subscribe((spelare: Spelare) => {
      this.game.gainedLife = spelare;
    });
    this.lostLife$.subscribe((spelare: Spelare) => {
      this.game.lostLife = spelare;
    });
    this.socket$ = new WebSocketSubject('ws://localhost:8999');

    this.socket$
        .subscribe(
        (message: Message) => console.log('server message', message),
        (err: any) => console.error(err),
        () => console.warn('Completed!')
        );
  }

  public lostLife$ = new Subject<Spelare>();
  public gainedLife$ = new Subject<Spelare>();
  private socket$: WebSocketSubject<Message>;


  private game: Game;
  spelarLista(): Spelare[] {
    return this.game.gameList;
  }
  newGame(): Game {
    const game = new Game();
    game.id = 1;
    game.initList = initList;
    game.gameList = initList;
    game.lastRoll = null;
    game.dice = this.diceService.reset();
    game.next = initList[0];
    this.roundListService.feed(game.gameList);
    this.game = game;
    return game;
  }
  resetGame(): Game {
    const game = this.game;
    game.gameList = this.roundListService.startList().map((_) => ({ id: _.spelare.id, namn: _.spelare.namn, liv: 2 }));
    game.next = game.gameList[0];
    game.dice = this.diceService.reset();
    this.roundListService.feed(game.gameList);
    return game;
  }
  get(): Game {
    return this.game;
  }
  getGame(): Observable<Game> {
    return of(this.game);
  }
  roll(stake: 'higher' | 'lower' | 'same') {
    const game = this.game;
    game.lastRoll = game.dice;
    game.dice = this.diceService.roll();
    switch (stake) {
      case 'lower': this.validateLower();
                    break;
      case 'higher': this.validateHigher();
                     break;
      case 'same': this.validateSame();
                   break;
    }
  }
  adderaSpelare() {
    const game = this.game;
    game.gameList.push({ id: game.gameList.length + 1, namn: 'Spelare ' + (game.gameList.length + 1).toString(), liv: 2 });
    this.roundListService.feed(game.gameList);
  }
  tabortSpelare(spelare: Spelare) {
    const game = this.game;
    game.gameList = game.gameList.filter((s) => s !== spelare);
    this.roundListService.feed(game.gameList);
  }
  private lower(a: number, b: number): boolean {
    return a < b;
  }
  private higher(a: number, b: number): boolean {
    return a > b;
  }
  private same(a: number, b: number): boolean {
    return a === b;
  }
  private validate(comp: (a: number, b: number) => boolean, matchPlus?: boolean) {
    const game = this.game;
    const spelare = this.roundListService.get();
    this.lostLife$.next(null);
    this.gainedLife$.next(null);
    if (!comp(game.dice.tot, game.lastRoll.tot)) {
      setTimeout(() => {
        spelare.spelare.liv--;
        this.lostLife$.next(spelare.spelare);
        if (spelare.spelare.liv === 0) {
          spelare.spelare.placering = game.gameList.filter((_) => _.liv !== 0).length + 1;
        }}, 3000);
    } else {
      if (matchPlus) {
        setTimeout(() => {
          if (spelare.spelare.liv === 1) {
          spelare.spelare.liv++;
          this.gainedLife$.next(spelare.spelare);
        }}, 3000);
      }
    }
    if (game.dice.tot === game.lastRoll.tot) {
      this.roundListService.toggleDir();
    }
    this.updateAfterValidate();

  }
  private validateLower() {
    this.validate(this.lower);
  }
  private validateHigher() {
    this.validate(this.higher);
  }
  private validateSame() {
    this.validate(this.same, true);
  }
  private updateAfterValidate() {
    setTimeout(() => {
    const game = this.game;
    game.next = this.roundListService.next();
    game.gameList = this.roundListService.orderList().map((_) => _.spelare);
    }, 4000);
  }
}
