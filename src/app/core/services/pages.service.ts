import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(private http: HttpClient, private translateService: TranslateService) {}
  private pages = {
    calculator: {
      type: 'calculator',
      name: 'CalculatorPage'
    },
    'deposit-guarantee': {
      type: 'deposit_guarantee',
      name: 'DepositGuaranteePage'
    },
    'deposit-tax': {
      type: 'deposit_tax',
      name: 'DepositTaxPage'
    },
    'deposit-bank-rates': {
      type: 'deposit_bank_rates',
      name: 'DepositBankRatesPage'
    },
    'application-to-fund': {
      type: 'application_to_fund',
      name: 'ApplicationToFundPage'
    },
    'fund-law': {
      type: 'fund_law',
      name: 'FundLawPage'
    }
  };
  api = 'https://fakedeposit-cms.herokuapp.com/api/v2/pages/?type=';
  getPageData(page: string) {
    console.log(this.translateService.currentLang);
    console.log(page);
    return this.http
      .get<any>(
        `${this.api}${this.pages[page].type}.${this.pages[page].name}&fields=_,text&slug=${this.pages[page].type}-${this.translateService.currentLang}`
      )
      .pipe(map((res) => res.items[0].text));
  }
}
