import { Component, Inject, PLATFORM_ID, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isBrowser: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  pageName = 'home';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public el: ElementRef,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private metaService: Meta,
    private translateService: TranslateService,
    private titleService: Title,
    private router: Router
  ) {
    const analyticsEnabled = environment.enableGoogleAnalytics;
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (analyticsEnabled && this.isBrowser) {
      this.appendGtmCode();
      this.appendGaTrackingCode();
      this.appendGtmNoscript();
      angulartics2GoogleAnalytics.startTracking();
    }
  }
  ngOnInit() {
    // this.translateService
    //   .get(`META.${this.pageName}.title`)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((title) => {
    //     this.metaService.updateTag({ name: 'og:title', content: title });
    //     this.titleService.setTitle(title);
    //   });
    // this.translateService
    //   .get(`META.${this.pageName}.description`)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((description) => {
    //     this.metaService.updateTag({ name: 'description', content: description });
    //     this.metaService.updateTag({ name: 'og:description', content: description });
    //   });
    this.metaService.updateTag({ name: 'robots', content: 'all' });
    this.updateLanguage();
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.updateLanguage();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private appendGtmCode() {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${environment.googleTagManagerKey}');
      `;
      document.head.appendChild(script);
    } catch (err) {
      console.error('Error appending google tag manager');
      console.error(err);
    }
  }

  private appendGtmNoscript() {
    try {
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.setAttribute(
        'src',
        `https://www.googletagmanager.com/ns.html?id=${environment.googleTagManagerKey}`
      );
      iframe.setAttribute('height', '0');
      iframe.setAttribute('width', '0');
      iframe.setAttribute('style', 'none');
      iframe.setAttribute('visibility', 'hidden');
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    } catch (err) {
      console.error('Error appending google tag manager noscript');
      console.error(err);
    }
  }

  private appendGaTrackingCode() {
    try {
      const script = document.createElement('script');
      script.innerHTML =
        `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '` +
        environment.googleAnalyticsKey +
        `', 'auto');
      `;
      document.head.appendChild(script);
    } catch (err) {
      console.error('Error appending google analytics');
      console.error(err);
    }
  }
  updateLanguage(): void {
    if (this.isBrowser) {
      const lang = document.createAttribute('lang');

      lang.value = this.translate.currentLang === 'ua' ? 'uk' : this.translate.currentLang;

      this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
    }
  }
}
