import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalculatorService } from '../shared/services/calculator.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fd-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  calculatorForm: FormGroup;
  result: number;
  calculatorPageData;
  private destroyed$ = new Subject();

  constructor(private calculatorService: CalculatorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.createForm();
    this.route.data.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      console.log(data);
      this.calculatorPageData = data.data.items[0].intro;
    });
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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
