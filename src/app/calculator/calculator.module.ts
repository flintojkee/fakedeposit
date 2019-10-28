import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './pages/calculator.component';
import { SharedModule } from '@fd/shared';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    SharedModule,
    LocalizeRouterModule,
    TranslateModule.forChild(),
    Angulartics2Module
  ],
  providers: []
})
export class CalculatorModule {}
