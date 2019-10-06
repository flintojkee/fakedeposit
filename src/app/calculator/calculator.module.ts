import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './pages/calculator.component';
import { SharedModule } from '@fd/shared';


@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    SharedModule
  ]
})
export class CalculatorModule { }
