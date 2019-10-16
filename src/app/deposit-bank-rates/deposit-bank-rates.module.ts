import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepositBankRatesComponent } from './pages/deposit-bank-rates.component';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { PageResolver } from '@fd/core/services';
import { SharedModule } from '@fd/shared';

const routes: Routes = [
  {
    path: '',
    component: DepositBankRatesComponent,
    resolve: { data: PageResolver },
    data: { page: 'deposit-bank-rates' }
  }
];

@NgModule({
  declarations: [DepositBankRatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ]
})
export class DepositBankRatesModule {}
