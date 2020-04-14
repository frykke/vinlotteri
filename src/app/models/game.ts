import { Spelare } from './spelare';
import { Dice } from './dice';

export class Game {
  public id: number;
  public initList: Spelare[];
  public gameList: Spelare[];
  public lastRoll: Dice;
  public dice: Dice;
  public next: Spelare;
  public lostLife: Spelare;
  public gainedLife: Spelare;
}
