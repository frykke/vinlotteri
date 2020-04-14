import { Injectable } from '@angular/core';
import { Dice } from '../models/dice';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }
  roll(): Dice {
      const dice1 = this.newValue();
      const dice2 = this.newValue();
      return { dice1, dice2, tot: dice1 + dice2  };
  }
  reset(): Dice {
    return { dice1: 1, dice2: 1, tot: 2 };
  }
  private newValue(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
