import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fd-deposit-tax',
  templateUrl: './deposit-tax.component.html',
  styleUrls: ['./deposit-tax.component.scss']
})
export class DepositTaxComponent implements OnInit, OnDestroy {
  pageData: any;
  destroy$ = new Subject();
  pageName = 'deposit-tax';
  constructor(
    private route: ActivatedRoute,
    private metaService: Meta,
    private titleService: Title,
    private translateService: TranslateService
  ) {
    metaService.updateTag({ name: 'robots', content: 'all' });
  }

  ngOnInit() {
    this.metaService.addTag({ name: 'robots', content: 'all' });
    this.route.data
      .pipe(
        map(res => res.data),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        const title = data.title + ' | Fakedeposit';
        const description = data.page_description;
        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ name: 'og:description', content: description });
        this.metaService.updateTag({ name: 'og:title', content: title });
        this.titleService.setTitle(title);
        this.pageData = data.text;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
