import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.scss']
})
export class DieComponent implements OnInit {

  constructor() { }
  @Input() value = 6;
  @Input() rolling: boolean;
  ngOnInit() {
  }

}
