import { Component, OnInit, Input } from '@angular/core';
export interface ChartValue {
  name: string;
  value: number;
}
export interface StackedBarChartData {
  name: string;
  series: ChartValue[];
}
@Component({
  selector: 'fd-result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.scss']
})
export class ResultChartComponent implements OnInit {
  @Input() results: StackedBarChartData[];
  constructor() {}
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#070E31', '#FEAA30', '#0082CA', '#AAAAAA']
  };
  ngOnInit() {}
}
