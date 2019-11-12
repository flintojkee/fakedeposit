import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDepositComponent } from './choose-deposit.component';

describe('ChooseDepositComponent', () => {
  let component: ChooseDepositComponent;
  let fixture: ComponentFixture<ChooseDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
