import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-die3d',
  templateUrl: './die3d.component.html',
  styleUrls: ['./die3d.component.scss']
})
export class Die3dComponent implements OnInit {

  constructor() { }
  @Input() value = 0;
  @Input() rolling: boolean;
  @Input() shortAnimation: boolean;

  ngOnInit() {
    console.log(this.value);
  }

}
