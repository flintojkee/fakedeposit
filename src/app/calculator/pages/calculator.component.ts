import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalculatorService } from '../shared/services/calculator.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
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
  private destroyed$ = new Subject();

  constructor(private calculatorService: CalculatorService, private route: ActivatedRoute) {}

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
