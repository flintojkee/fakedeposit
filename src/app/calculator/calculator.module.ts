import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { SharedModule } from '@fd/shared';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalculatorPageComponent } from './pages/calculator-page.component';
import { ResultChartComponent } from './components/result-chart/result-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [CalculatorComponent, CalculatorPageComponent, ResultChartComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    SharedModule,
    LocalizeRouterModule,
    TranslateModule.forChild(),
    Angulartics2Module,
    NgxChartsModule
  ],
  providers: []
})
export class CalculatorModule {}
