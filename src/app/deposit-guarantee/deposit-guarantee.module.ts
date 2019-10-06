import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepositGuaranteeComponent } from './deposit-guarantee.component';


const routes: Routes = [
  { path: '', component: DepositGuaranteeComponent }
];

@NgModule({
  declarations: [DepositGuaranteeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DepositGuaranteeModule { }
