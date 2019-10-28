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
  destroyed$ = new Subject();
  pageName = 'deposit-bank-rates';
  constructor(
    private route: ActivatedRoute,
    public metaService: Meta,
    public titleService: Title,
    public translateService: TranslateService,
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

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
