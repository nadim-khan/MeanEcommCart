import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrainersComponent } from './trainers.component';

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
