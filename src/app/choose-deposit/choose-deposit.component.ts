import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fd-choose-deposit',
  templateUrl: './choose-deposit.component.html',
  styleUrls: ['./choose-deposit.component.scss']
})

export class ChooseDepositComponent implements OnInit, OnDestroy {

  pageData: any;
  destroy$ = new Subject();
  pageName = 'choose_deposit';

  constructor(
    private route: ActivatedRoute,
    private metaService: Meta,
    private titleService: Title
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
