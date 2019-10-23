import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PagesService } from './pages.service';
import { finalize, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class PageResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private pagesService: PagesService, //   private globalPreloaderService: GlobalPreloaderService
    private transferState: TransferState
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const PAGE_KEY = makeStateKey<any>('page-' + route.data.page);
    if (this.transferState.hasKey(PAGE_KEY)) {
      const page = this.transferState.get<any>(PAGE_KEY, null);
      this.transferState.remove(PAGE_KEY);
      return of(page);
    } else {
      return this.pagesService.getPageData(route.data.page).pipe(
        catchError((err) => {
          return of(err);
        }),
        finalize(() => {
          // this.globalPreloaderService.hide();
        })
      );
    }
  }
}
