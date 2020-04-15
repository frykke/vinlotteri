import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.scss']
})
export class DieComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() value = 6;
  @Input() rolling: boolean;
  private audio = new Audio();
  ngOnInit() {
    this.audio.src = './16509_1460655272.mp3';
    this.audio.load();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rolling && !changes.rolling.firstChange && changes.rolling.currentValue) {
      this.rollSound();
    }
  }
  rollSound() {
    this.audio.play();
  }
}
