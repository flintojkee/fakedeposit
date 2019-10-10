import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize, } from 'rxjs/operators';
import { CalculatorService } from './services/calculator.service';

@Injectable()
export class CalculatorResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private calculatorService: CalculatorService,
 //   private globalPreloaderService: GlobalPreloaderService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
   // this.globalPreloaderService.show();
    return this.calculatorService.getCalculatorPageData()
      .pipe(
      catchError((err) => {
        this.router.navigate(['/404']);
        return of(err);
      }),
      finalize(() => {
       // this.globalPreloaderService.hide();
      })
    );
  }
}
