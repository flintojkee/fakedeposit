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
  destroyed$ = new Subject();
  pageName = 'deposit-tax';
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
    this.metaService.addTag({name: 'robots', content: 'all'});
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
