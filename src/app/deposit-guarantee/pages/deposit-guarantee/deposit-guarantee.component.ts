import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'fd-deposit-guarantee',
  templateUrl: './deposit-guarantee.component.html',
  styleUrls: ['./deposit-guarantee.component.scss']
})
export class DepositGuaranteeComponent implements OnInit, OnDestroy {
  pageData: any;
  destroyed$ = new Subject();

  constructor(private route: ActivatedRoute, private metaService: Meta) {}

  ngOnInit() {
    this.metaService.addTag({name: 'robots', content: 'all'});
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
