import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorComponent } from './pages/calculator.component';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { CalculatorResolver } from './shared/calculator.resolver';

const routes: Routes = [
  { path: '', component: CalculatorComponent, resolve: { data: CalculatorResolver } }
];

@NgModule({
  imports: [TranslateModule, LocalizeRouterModule.forChild(routes), RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CalculatorResolver]
})
export class CalculatorRoutingModule {}
