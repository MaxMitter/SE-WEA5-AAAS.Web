import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientcardComponent } from './clientcard.component';

describe('ClientcardComponent', () => {
  let component: ClientcardComponent;
  let fixture: ComponentFixture<ClientcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
