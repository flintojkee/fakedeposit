import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
export interface Lang {
  label: string;
  url: string;
}
@Component({
  selector: 'fd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentLang: string;
  allLangs = [
    { label: 'ua', url: '/ua/.' },
    { label: 'en', url: '/en/.' },
    { label: 'ru', url: '/ru/.' }
  ];
  langs = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUrl: string;
  constructor(private translateService: TranslateService, private router: Router) {}

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLang = this.translateService.currentLang;
        this.currentUrl = event.url;
        if (this.currentUrl === '/') {
          this.allLangs = [
            { label: 'ua', url: '/ua/.' },
            { label: 'en', url: '/en/.' },
            { label: 'ru', url: '/ru/.' }
          ];
        } else {
          this.allLangs = this.allLangs.map((lang) => ({
            url: this.currentUrl.replace(this.currentLang, lang.label),
            label: lang.label
          }));
        }

        this.langs = this.allLangs.filter((lang) => lang.label !== this.currentLang);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setLang(lang: Lang) {
    this.translateService
      .use(lang.label)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        console.log(lang);
        this.router.navigate([lang.url]);
      });
  }
}
