import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorComponent } from './pages/calculator.component';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { PageResolver } from '@fd/core/services';

const routes: Routes = [
  {
    path: '',
    component: CalculatorComponent,
    resolve: { data: PageResolver },
    data: { page: 'calculator' }
  }
];

@NgModule({
  imports: [
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [PageResolver]
})
export class CalculatorRoutingModule {}
