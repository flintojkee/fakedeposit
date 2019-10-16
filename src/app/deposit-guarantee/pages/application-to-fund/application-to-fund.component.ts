import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fd-application-to-fund',
  templateUrl: './application-to-fund.component.html',
  styleUrls: ['./application-to-fund.component.scss']
})
export class ApplicationToFundComponent implements OnInit, OnDestroy {

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

