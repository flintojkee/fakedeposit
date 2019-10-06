import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './pages/calculator.component';
import { SharedModule } from '@fd/shared';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    SharedModule,
    LocalizeRouterModule,
    TranslateModule.forChild()
  ]
})
export class CalculatorModule { }
