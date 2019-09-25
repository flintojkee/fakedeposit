import { Component, Inject, PLATFORM_ID, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public el: ElementRef,
    ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.translate.setDefaultLang('ua');
  }
  ngOnInit() {
    console.log(this.translate.currentLang);
  }
}
