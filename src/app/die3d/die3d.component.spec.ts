import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Die3dComponent } from './die3d.component';

describe('Die3dComponent', () => {
  let component: Die3dComponent;
  let fixture: ComponentFixture<Die3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Die3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Die3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
