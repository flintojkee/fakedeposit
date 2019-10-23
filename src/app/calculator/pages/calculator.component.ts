import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalculatorService } from '../shared/services/calculator.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
export enum Currency {
  dollar = '$',
  hryvnia = '₴',
  euro = '€'
}

@Component({
  selector: 'fd-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  calculatorForm: FormGroup;
  result: number;
  pageData: any;
  currency = Currency.dollar;
  pageName = 'calculator';
  private destroyed$ = new Subject();

  constructor(
    private calculatorService: CalculatorService,
    private route: ActivatedRoute,
    public metaService: Meta,
    public titleService: Title,
    public translateService: TranslateService,
    @Inject(DOCUMENT) public dom
  ) {

    const title = translateService.instant(`META.${this.pageName}.title`);
    const description = translateService.instant(`META.${this.pageName}.description`);
    const canonicalLink = translateService.instant(`META.${this.pageName}.canonical_link`);
    titleService.setTitle(title);
    metaService.updateTag({ name: 'robots', content: 'all' });
    metaService.updateTag({ name: 'description', content: description });
    metaService.updateTag({ name: 'og:title', content: title });
    metaService.updateTag({ name: 'og:description', content: description });
  }

  ngOnInit() {
    this.createForm();
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

  changeCurrency() {
    const index =
      Object.values(Currency).indexOf(this.currency) + 1 >= Object.values(Currency).length
        ? 0
        : Object.values(Currency).indexOf(this.currency) + 1;
    this.currency = Object.values(Currency)[index];
  }

  createForm() {
    this.calculatorForm = this.calculatorService.createCalculatorForm();
  }

  get f() {
    return this.calculatorForm.controls;
  }

  get initial() {
    return this.calculatorForm.controls.initial;
  }

  get interest() {
    return this.calculatorForm.controls.interest;
  }

  get term() {
    return this.calculatorForm.controls.term;
  }

  calculate() {
    if (this.calculatorForm.invalid) {
      Object.keys(this.calculatorForm.controls).map((key) => {
        this.calculatorForm.controls[key].markAsDirty();
        this.calculatorForm.controls[key].markAsTouched();
      });
    } else {
      this.result = this.calculatorService.calculateDeposit(
        this.f.initial.value,
        this.f.interest.value,
        this.f.term.value
      );
    }
  }
}
