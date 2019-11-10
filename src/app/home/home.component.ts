import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageName = 'home';
  destroy$ = new Subject();
  constructor(
    private metaService: Meta,
    private translateService: TranslateService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.translateService
      .get(`META.${this.pageName}.title`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((title) => {
        this.metaService.updateTag({ name: 'og:title', content: title });
        this.titleService.setTitle(title);
      });
    this.translateService
      .get(`META.${this.pageName}.description`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((description) => {
        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ name: 'og:description', content: description });
      });
    this.metaService.updateTag({ name: 'robots', content: 'all' });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
