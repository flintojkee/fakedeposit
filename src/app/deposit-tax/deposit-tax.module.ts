import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepositTaxComponent } from './deposit-tax.component';


const routes: Routes = [
  { path: '', component: DepositTaxComponent }
];

@NgModule({
  declarations: [DepositTaxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DepositTaxModule { }
