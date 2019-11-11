import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { BankRatesResponse, BankRate } from '@fd/shared/models';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DepositBankRatesService {
  constructor(private http: HttpClient, private translateService: TranslateService) {}
  getBankRates(): Observable<BankRate[]> {
    const lang =
      this.translateService.currentLang === 'ua' ? 'uk' : this.translateService.currentLang;
    return this.http
      .get<BankRatesResponse>(
        `https://fakedeposit-cms.herokuapp.com/api/v2/pages/?type=deposit_bank_rates.BankPage&deposit_path=${lang}&fields=*`
      )
      .pipe(
        map((res) => res.items),
        catchError((err) => {
          return of(err);
        })
      );
  }
}
