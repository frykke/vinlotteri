import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Spelare } from '../models/spelare';
import { Direction } from '../models/game';


@Component({
  selector: 'app-round-list-item',
  templateUrl: './round-list-item.component.html',
  styleUrls: ['./round-list-item.component.scss']
})
export class RoundListItemComponent implements OnInit {

  constructor() { }
  @Input() spelare: Spelare;
  @Input() isNext: boolean;
  @Input() hasLostLife: boolean;
  @Input() hasGainedLife: boolean;
  @Input() direction: Direction;
  @Input() editMode: boolean;
  @Input() order: number;
  @Output() remove = new EventEmitter<Spelare>();
  @Output() edit = new EventEmitter<Spelare>();

  ngOnInit() {
  }
  onEdit() {
    this.edit.emit(this.spelare);
  }
  onRemove() {
    this.remove.emit(this.spelare);
  }
}
