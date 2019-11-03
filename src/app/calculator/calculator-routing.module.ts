import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalizeRouterModule } from 'localize-router';
import { PageResolver } from '@fd/core/services';
import { CalculatorPageComponent } from './pages/calculator-page.component';

const routes: Routes = [
  {
    path: '',
    component: CalculatorPageComponent,
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
