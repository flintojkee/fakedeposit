import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fd-application-to-fund',
  templateUrl: './application-to-fund.component.html',
  styleUrls: ['./application-to-fund.component.scss']
})
export class ApplicationToFundComponent implements OnInit, OnDestroy {
  pageData: any;
  destroy$ = new Subject();
  pageName = 'application-to-fund';
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
