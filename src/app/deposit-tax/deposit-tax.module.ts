import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepositTaxComponent } from './deposit-tax.component';
import { PageResolver } from '@fd/core/services';
import { SharedModule } from '@fd/shared';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: DepositTaxComponent,
    resolve: { data: PageResolver },
    data: { page: 'deposit-tax' }
  }
];

@NgModule({
  declarations: [DepositTaxComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    SharedModule,
    TranslateModule.forChild(),
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ]
})
export class DepositTaxModule {}
