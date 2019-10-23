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
  destroyed$ = new Subject();
  pageName = 'application-to-fund';
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

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
