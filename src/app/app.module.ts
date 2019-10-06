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

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then((m) => m.CalculatorModule)
  },
  {
    path: 'deposit-guarantee',
    loadChildren: () =>
      import('./deposit-guarantee/deposit-guarantee.module').then((m) => m.DepositGuaranteeModule)
  },
  {
    path: 'deposit-tax',
    loadChildren: () => import('./deposit-tax/deposit-tax.module').then((m) => m.DepositTaxModule)
  },
  {
    path: 'deposit-bank-rates',
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
  }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.locales}/assets/locales/`, '.json');
}
export function createTranslateLoaderRouter(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings
) {
  return new ManualParserLoader(translate, location, settings, ['en', 'ru', 'ua'], 'ROUTES.');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'fakedeposit' }),
    HttpClientModule,
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
        useFactory: (createTranslateLoaderRouter),
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }),
    RouterModule.forRoot(routes),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
