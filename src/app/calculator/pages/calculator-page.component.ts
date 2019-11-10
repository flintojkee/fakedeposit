import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalculatorService, CalculatorResult } from '../shared/services/calculator.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { StackedBarChartData } from '../components/result-chart/result-chart.component';

export enum Currency {
  dollar = '$',
  hryvnia = '₴',
  euro = '€'
}

@Component({
  selector: 'fd-calculator-page',
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.scss']
})
export class CalculatorPageComponent implements OnInit, OnDestroy {
  pageData: any;
  pageName = 'calculator';
  private destroy$ = new Subject();
  chartResults: StackedBarChartData[];
  constructor(
    private route: ActivatedRoute,
    public metaService: Meta,
    public titleService: Title,
    public translateService: TranslateService,
    @Inject(DOCUMENT) public dom
  ) {
    this.translateService
      .get(`META.${this.pageName}.title`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((title) => {
        metaService.updateTag({ name: 'og:title', content: title });
        titleService.setTitle(title);
      });
    this.translateService
      .get(`META.${this.pageName}.description`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((description) => {
        metaService.updateTag({ name: 'description', content: description });
        metaService.updateTag({ name: 'og:description', content: description });
      });
    metaService.updateTag({ name: 'robots', content: 'all' });
  }

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.data),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.pageData = data;
      });
  }

  setCalculatorResult(result: CalculatorResult) {
    this.chartResults = [
      {
        name: '',
        series: [
          {
            name: this.translateService.instant(`CALCULATOR.initial-deposit`), // 'Initial deposit',
            value: result.initialValue
          },
          {
            name: this.translateService.instant(`CALCULATOR.total-contributions`),
            value: result.contributionValue
          },
          {
            name: this.translateService.instant(`CALCULATOR.interest-earned`),
            value: result.interestValue
          }
        ]
      }
    ];
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
