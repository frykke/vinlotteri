import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Dice } from '../models/dice';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() dice: Dice = null;
  @Input() rolling: boolean;
  @Input() audioOn = true;
  private audio = new Audio();
  ngOnInit() {
    this.audio.src = './16509_1460655272.mp3';
    this.audio.load();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rolling && !changes.rolling.firstChange && changes.rolling.currentValue && this.audioOn) {
      this.rollSound();
    }
  }
  rollSound() {
    this.audio.play();
  }

}
