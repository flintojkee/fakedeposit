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
  private destroyed$ = new Subject();
  chartResults: StackedBarChartData[];
  constructor(
    private route: ActivatedRoute,
    public metaService: Meta,
    public titleService: Title,
    public translateService: TranslateService,
    @Inject(DOCUMENT) public dom
  ) {
    const title = translateService.instant(`META.${this.pageName}.title`);
    const description = translateService.instant(`META.${this.pageName}.description`);
    const canonicalLink = translateService.instant(`META.${this.pageName}.canonical_link`);
    titleService.setTitle(title);
    metaService.updateTag({ name: 'robots', content: 'all' });
    metaService.updateTag({ name: 'description', content: description });
    metaService.updateTag({ name: 'og:title', content: title });
    metaService.updateTag({ name: 'og:description', content: description });
  }

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.data),
        takeUntil(this.destroyed$)
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
            name: 'Initial deposit',
            value: result.initialValue
          },
          {
            name: 'Total contributions',
            value: result.contributionValue
          },
          {
            name: 'Interest earned',
            value: result.interestValue
          }
        ]
      }
    ];
    console.log(this.chartResults);
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
