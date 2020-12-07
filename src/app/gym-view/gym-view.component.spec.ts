import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GymViewComponent } from './gym-view.component';

describe('GymViewComponent', () => {
  let component: GymViewComponent;
  let fixture: ComponentFixture<GymViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GymViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
