import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorCardComponent } from './detector-card.component';

describe('DetectorCardComponent', () => {
  let component: DetectorCardComponent;
  let fixture: ComponentFixture<DetectorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
