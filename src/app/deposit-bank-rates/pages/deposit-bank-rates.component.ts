import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'fd-deposit-bank-rates',
  templateUrl: './deposit-bank-rates.component.html',
  styleUrls: ['./deposit-bank-rates.component.scss']
})
export class DepositBankRatesComponent implements OnInit, OnDestroy {
  pageData: any;
  destroyed$ = new Subject();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.data),
        takeUntil(this.destroyed$)
      )
      .subscribe((data) => {
        this.pageData = data;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
