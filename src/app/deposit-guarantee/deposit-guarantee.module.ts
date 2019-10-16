import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepositGuaranteeComponent } from './pages/deposit-guarantee/deposit-guarantee.component';
import { PageResolver } from '@fd/core/services';
import { FundLawComponent } from './pages/fund-law/fund-law.component';
import { ApplicationToFundComponent } from './pages/application-to-fund/application-to-fund.component';

const routes: Routes = [
  {
    path: '',
    component: DepositGuaranteeComponent,
    resolve: { data: PageResolver },
    data: { page: 'deposit-guarantee' }
  },
  {
    path: 'fund-law',
    component: FundLawComponent,
    resolve: { data: PageResolver },
    data: { page: 'fund-law' }
  },
  {
    path: 'application-fund',
    component: ApplicationToFundComponent,
    resolve: { data: PageResolver },
    data: { page: 'application-fund' }
  }
];

@NgModule({
  declarations: [DepositGuaranteeComponent, FundLawComponent, ApplicationToFundComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DepositGuaranteeModule {}
