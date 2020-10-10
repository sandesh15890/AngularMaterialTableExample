import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sailingscheduleview } from './sailingscheduleview.component';

describe('Sailingscheduleview.ComponentComponent', () => {
  let component: Sailingscheduleview;
  let fixture: ComponentFixture<Sailingscheduleview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sailingscheduleview],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sailingscheduleview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
