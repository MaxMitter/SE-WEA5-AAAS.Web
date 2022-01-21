import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogmessageComponent } from './logmessage.component';

describe('LogmessageComponent', () => {
  let component: LogmessageComponent;
  let fixture: ComponentFixture<LogmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogmessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
