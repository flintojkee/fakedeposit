import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChooseDepositComponent } from './choose-deposit.component';
import { LocalizeRouterModule } from 'localize-router';
import { SharedModule } from '@fd/shared';
import { TranslateModule } from '@ngx-translate/core';
import { PageResolver } from '@fd/core/services';


const routes: Routes = [
  { path: '',
    component: ChooseDepositComponent,
    resolve: { data: PageResolver },
    data: { page: 'choose-deposit' }
  },

];

@NgModule({
  declarations: [ChooseDepositComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    SharedModule,
    TranslateModule.forChild(),
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ]
})
export class ChooseDepositModule { }
