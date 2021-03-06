import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepositGuaranteeComponent } from './pages/deposit-guarantee/deposit-guarantee.component';
import { PageResolver } from '@fd/core/services';
import { FundLawComponent } from './pages/fund-law/fund-law.component';
import { ApplicationToFundComponent } from './pages/application-to-fund/application-to-fund.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { SharedModule } from '@fd/shared';

@NgModule({
  declarations: [DepositGuaranteeComponent, FundLawComponent, ApplicationToFundComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    SharedModule,
    TranslateModule.forChild(),
    RouterModule
  ]
})
export class DepositGuaranteeModule {}
