import { TestBed } from '@angular/core/testing';

import { DepositBankRatesService } from './deposit-bank-rates.service';

describe('DepositBankRatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepositBankRatesService = TestBed.get(DepositBankRatesService);
    expect(service).toBeTruthy();
  });
});
