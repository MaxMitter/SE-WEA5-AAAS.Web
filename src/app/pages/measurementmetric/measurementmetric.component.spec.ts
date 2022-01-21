import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementmetricComponent } from './measurementmetric.component';

describe('MeasurementmetricComponent', () => {
  let component: MeasurementmetricComponent;
  let fixture: ComponentFixture<MeasurementmetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementmetricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementmetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
