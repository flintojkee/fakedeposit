import { Component, Inject, PLATFORM_ID, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../environments/environment';

@Component({
  selector: 'fd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public el: ElementRef,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) {
    const analyticsEnabled = environment.enableGoogleAnalytics;
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (analyticsEnabled && this.isBrowser) {
      this.appendGtmCode();
      this.appendGaTrackingCode();
      this.appendGtmNoscript();
      angulartics2GoogleAnalytics.startTracking();
    }
    this.translate.setDefaultLang('ua');
  }
  ngOnInit() {
    console.log(this.translate.currentLang);
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
}
