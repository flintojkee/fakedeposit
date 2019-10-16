import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepositTaxComponent } from './deposit-tax.component';
import { PageResolver } from '@fd/core/services';

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
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DepositTaxModule {}
