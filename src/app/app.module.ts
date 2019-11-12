import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {
  LocalizeRouterModule,
  LocalizeParser,
  LocalizeRouterSettings,
  ManualParserLoader
} from 'localize-router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Location } from '@angular/common';
import { environment } from '../environments/environment';
import { CoreModule } from './core';
import { Angulartics2Module } from 'angulartics2';
import { FundLawComponent } from './deposit-guarantee/pages/fund-law/fund-law.component';
import { PageResolver } from './core/services';
import { DepositGuaranteeModule } from './deposit-guarantee/deposit-guarantee.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { DepositGuaranteeComponent } from './deposit-guarantee/pages/deposit-guarantee/deposit-guarantee.component';
import { ApplicationToFundComponent } from './deposit-guarantee/pages/application-to-fund/application-to-fund.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const routes: Routes = [
  { path: '', redirectTo: '/.', pathMatch: 'full' },
  { path: '.', component: HomeComponent },
  {
    path: 'calculator/.',
    loadChildren: () => import('./calculator/calculator.module').then((m) => m.CalculatorModule)
  },
  {
    path: 'deposit-guarantee/.',
    component: DepositGuaranteeComponent,
    resolve: { data: PageResolver },
    data: { page: 'deposit-guarantee' }
  },
  {
    path: 'deposit-tax/.',
    loadChildren: () => import('./deposit-tax/deposit-tax.module').then((m) => m.DepositTaxModule)
  },
  {
    path: 'deposit-guarantee/fund-law/.',
    component: FundLawComponent,
    resolve: { data: PageResolver },
    data: { page: 'fund-law' }
  },
  {
    path: 'deposit-guarantee/application-to-fund/.',
    component: ApplicationToFundComponent,
    resolve: { data: PageResolver },
    data: { page: 'application-to-fund' }
  },
  {
    path: 'deposit-bank-rates/.',
    loadChildren: () =>
      import('./deposit-bank-rates/deposit-bank-rates.module').then((m) => m.DepositBankRatesModule)
  },

  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then((m) => m.AboutUsModule)
  },
  {
    path: 'about-project',
    loadChildren: () =>
      import('./about-project/about-project.module').then((m) => m.AboutProjectModule)
  },
  { path: 'choose-deposit/.', loadChildren: () => import('./choose-deposit/choose-deposit.module').then(m => m.ChooseDepositModule) },
  // { path: 'home/.', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.locales}/assets/locales/`, '.json');
}
export function createTranslateLoaderRouter(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings
) {
  return new ManualParserLoader(translate, location, settings, ['ua', 'ru', 'en'], 'ROUTES.');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'fakedeposit' }),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [/* PLATFORM_ID, */ HttpClient]
      }
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: createTranslateLoaderRouter,
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }),
    RouterModule.forRoot(routes),
    Angulartics2Module.forRoot(),
    CoreModule,
    HomeModule,
    DepositGuaranteeModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

const __stripTrailingSlash = (Location as any).stripTrailingSlash;
Location.stripTrailingSlash = function(url) {
  if (url.endsWith('/')) {
    url = url;
  } else {
    url = url + '/';
  }
  const queryString$ = url.match(/([^?]*)?(.*)/);
  if (queryString$[2].length > 0) {
    return /[^\/]\/$/.test(queryString$[1])
      ? queryString$[1] + '.' + queryString$[2]
      : __stripTrailingSlash(url);
  }
  return /[^\/]\/$/.test(url) ? url + '.' : __stripTrailingSlash(url);
};
