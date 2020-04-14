import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundListItemComponent } from './round-list-item.component';

describe('RoundListItemComponent', () => {
  let component: RoundListItemComponent;
  let fixture: ComponentFixture<RoundListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
