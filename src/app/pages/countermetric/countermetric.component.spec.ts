import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountermetricComponent } from './countermetric.component';

describe('CountermetricComponent', () => {
  let component: CountermetricComponent;
  let fixture: ComponentFixture<CountermetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountermetricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountermetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
