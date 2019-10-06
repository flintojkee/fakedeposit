import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepositBankRatesComponent } from './deposit-bank-rates.component';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: DepositBankRatesComponent }];

@NgModule({
  declarations: [DepositBankRatesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ]
})
export class DepositBankRatesModule {}
