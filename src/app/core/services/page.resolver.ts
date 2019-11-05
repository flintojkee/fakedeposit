import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PagesService } from './pages.service';
import { finalize, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PageResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private pagesService: PagesService //   private globalPreloaderService: GlobalPreloaderService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
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
