import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoundListService } from '../services/round-list.service';
import { Spelare } from '../models/spelare';

@Component({
  selector: 'app-round-list',
  templateUrl: './round-list.component.html',
  styleUrls: ['./round-list.component.scss']
})
export class RoundListComponent implements OnInit {
  @Input() roundList: Spelare[];
  @Input() next: Spelare;
  @Input() spelareLostLife: Spelare;
  @Input() spelareGainedLife: Spelare;
  @Output() adderaSpelare = new EventEmitter();
  @Output() tabortSpelare = new EventEmitter<Spelare>();
  @Output() resetGame = new EventEmitter();
  public removed: Spelare;
  public orderList: Spelare[];
  public editing = false;
  public rendering: boolean[];
  constructor(private roundListService: RoundListService) { }
  ngOnInit() {
    this.roundListService.feed(this.roundList);
    this.orderList = this.roundListService.orderList().map((_) => _.spelare);
    this.rendering = this.roundList.map(() => false);
  }
  edit() {
    this.editing = true;
  }
  save() {
    if (this.editing) {
      this.editing = false;
    }
  }
  reset() {
    this.resetGame.emit();
  }
  add() {
    this.adderaSpelare.emit();
  }
  remove(spelare: Spelare) {
    this.tabortSpelare.emit(spelare);
  }
  lostLife(spelare: Spelare) {
    this.spelareLostLife = spelare;
  }
  gainedLife(spelare: Spelare) {
    this.spelareGainedLife = spelare;
  }
}
