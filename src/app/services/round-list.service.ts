import { Injectable } from '@angular/core';
import { Spelare } from '../models/spelare';

@Injectable({
  providedIn: 'root'
})
export class RoundListService {

  constructor() {
    this.list = [];
    this.listLength = 0;
  }
  private list: { ix: number, spelare: Spelare }[] ;
  private ptr = 0;
  private listLength = 0;
  private forward = true;
  public lostLife: Spelare | null = null;
  public gainedLife: Spelare | null = null;
  next(): Spelare | null {
    if (this.listLength === 0) {
      throw new Error('Empty list');
    }
    const orderList = this.orderList()
          .filter((_) => _.spelare.liv > 0);
    const item = orderList.length > 1 ? orderList[1] : orderList[0];
    if (item) {
      this.ptr = item.ix;
      return item.spelare;
    }
    return null;
  }
  toggleDir(): boolean {
    this.forward = !this.forward;
    return this.forward;
  }
  pull(): Spelare {
    const removed = this.list[this.ptr];
    this.list = this.list.filter((_, ix: number) => ix !== this.ptr);
    this.ptr = this.listLength >= this.ptr ? 0 : this.ptr;
    this.listLength = this.list.length;
    return removed.spelare;
  }
  get() {
    return this.list[this.ptr];
  }
  feed(valueList: Spelare[]): { ix: number, spelare: Spelare }[] {
    this.list = valueList.map ((_, ix) => ({ ix, spelare: _}));
    this.ptr = 0;
    this.forward = true;
    this.listLength = valueList.length;
    return this.list;
  }
  startList() {
    return this.list;
  }
  orderList(): { ix: number, spelare: Spelare }[] {
    const list = this.list;
    if (this.forward) {
      return list
      .filter((_, ix: number) => _.spelare.liv > 0 && ix >= this.ptr)
      .concat(list.filter((_, ix: number) => _.spelare.liv > 0 && ix < this.ptr))
      .concat(list.filter((_, ix: number) => _.spelare.liv === 0).sort((a, b) => a.spelare.placering - b.spelare.placering))
      ;
    } else {
      return list
      .filter((_, ix: number) =>  _.spelare.liv > 0 && ix <= this.ptr).reverse()
      .concat(list.filter((_, ix: number) => _.spelare.liv > 0 &&  ix > this.ptr).reverse())
      .concat(list.filter((_, ix: number) => _.spelare.liv === 0).sort((a, b) => a.spelare.placering - b.spelare.placering));
    }
  }

}
