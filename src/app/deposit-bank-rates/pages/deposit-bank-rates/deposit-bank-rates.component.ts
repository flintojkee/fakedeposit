import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { DepositBankRatesService } from '../../shared/deposit-bank-rates.service';
import { BankRate } from '@fd/shared/models';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'fd-deposit-bank-rates',
  templateUrl: './deposit-bank-rates.component.html',
  styleUrls: ['./deposit-bank-rates.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DepositBankRatesComponent implements OnInit, OnDestroy {
  @ViewChild('fullBodyRow', { static: true }) fullBodyRow: TemplateRef<any>;
  @ViewChild('fullBodyHeader', { static: true }) fullBodyHeader: TemplateRef<any>;
  @ViewChild('myTable', { static: false }) table: any;
  pageData: any;
  destroy$ = new Subject();
  pageName = 'deposit-bank-rates';
  bankRates: Observable<BankRate[]>;
  columns = [
    { name: 'Title' },
    { name: 'Hryvna' },
    { name: 'Dollar', prop: 'dolar' },
    { name: 'Euro' },
    {
      cellTemplate: this.fullBodyRow,
      headerTemplate: this.fullBodyHeader,
      prop: 'body',
      name: 'Description'
    }
  ];
  ColumnMode = ColumnMode;

  constructor(
    private route: ActivatedRoute,
    public metaService: Meta,
    public titleService: Title,
    public translateService: TranslateService,
    private depositBankRatesService: DepositBankRatesService
  ) {
    this.translateService
      .get(`META.${this.pageName}.title`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((title) => {
        metaService.updateTag({ name: 'og:title', content: title });
        titleService.setTitle(title);
      });
    this.translateService
      .get(`META.${this.pageName}.description`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((description) => {
        metaService.updateTag({ name: 'description', content: description });
        metaService.updateTag({ name: 'og:description', content: description });
      });

    metaService.updateTag({ name: 'robots', content: 'all' });
  }

  ngOnInit() {
    this.initPageData();
    this.setBankRates();
  }

  initPageData() {
    this.route.data
      .pipe(
        map((res) => res.data),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.pageData = data.text;
      });
  }

  setBankRates() {
    this.bankRates = this.depositBankRatesService.getBankRates();
    this.depositBankRatesService.getBankRates().subscribe((res) => {
      console.log(res);
    });
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
