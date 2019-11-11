import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositBankRatesComponent } from './deposit-bank-rates.component';

describe('DepositBankRatesComponent', () => {
  let component: DepositBankRatesComponent;
  let fixture: ComponentFixture<DepositBankRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositBankRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositBankRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
