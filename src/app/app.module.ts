import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Location } from '@angular/common';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.locales}/assets/locales/`, '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'fakedeposit' }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [/* PLATFORM_ID, */HttpClient]
      }
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings) =>
            new ManualParserLoader(translate, location, settings, ['en', 'ru', 'ua'], 'ROUTES.'),
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }),
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
