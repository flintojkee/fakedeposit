import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fd-deposit-bank-rates',
  templateUrl: './deposit-bank-rates.component.html',
  styleUrls: ['./deposit-bank-rates.component.scss']
})
export class DepositBankRatesComponent implements OnInit, OnDestroy {
  pageData: any;
  destroy$ = new Subject();
  pageName = 'deposit-bank-rates';
  constructor(
    private route: ActivatedRoute,
    public metaService: Meta,
    public titleService: Title,
    public translateService: TranslateService
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
        this.pageData = data.text;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
