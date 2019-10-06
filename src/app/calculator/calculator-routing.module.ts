import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorComponent } from './pages/calculator.component';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: CalculatorComponent }];

@NgModule({
  imports: [TranslateModule, LocalizeRouterModule.forChild(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorRoutingModule {}
