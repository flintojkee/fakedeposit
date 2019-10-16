import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'fd-deposit-tax',
  templateUrl: './deposit-tax.component.html',
  styleUrls: ['./deposit-tax.component.scss']
})
export class DepositTaxComponent implements OnInit, OnDestroy {

  pageData: any;
  destroyed$ = new Subject();

  constructor(private route: ActivatedRoute) { }

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
