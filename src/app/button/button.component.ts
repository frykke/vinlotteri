import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }
  @Input() active: boolean;
  @Input() disabled: boolean;
  @Input() size: 'small' | null;
  @Output() action = new EventEmitter();

  onClickButton() {
    this.action.emit();
  }

  ngOnInit() {
  }

}
