import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespanmetricComponent } from './timespanmetric.component';

describe('TimespanmetricComponent', () => {
  let component: TimespanmetricComponent;
  let fixture: ComponentFixture<TimespanmetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimespanmetricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimespanmetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
