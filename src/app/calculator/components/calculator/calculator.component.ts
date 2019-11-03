import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Currency } from '@fd/calculator/pages/calculator-page.component';
import {
  CalculatorService,
  TimeFrame,
  CalculatorResult
} from '@fd/calculator/shared/services/calculator.service';

@Component({
  selector: 'fd-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  result: CalculatorResult;
  currency = Currency.dollar;
  timeFrame = TimeFrame;
  contributionTimeFrame = this.timeFrame.none;
  capitalizationTimeFrame = this.timeFrame.none;
  @Output() calculatorResult = new EventEmitter<CalculatorResult>();
  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.createForm();
    this.calculatorForm.valueChanges.subscribe((res) => {
      this.calculate();
    });
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
    this.initial.setValue(10000);
    this.interest.setValue(10);
    this.term.setValue(12);
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

  get contribution() {
    return this.calculatorForm.controls.contribution;
  }

  setContributionTimeFrame(timeFrame: TimeFrame) {
    this.contributionTimeFrame =
      this.contributionTimeFrame === timeFrame ? TimeFrame.none : timeFrame;
  }
  setCapitalizationTimeFrame(timeFrame: TimeFrame) {
    this.capitalizationTimeFrame = timeFrame;
  }

  calculate() {
    if (this.calculatorForm.invalid) {
      Object.keys(this.calculatorForm.controls).map((key) => {
        this.calculatorForm.controls[key].markAsDirty();
        this.calculatorForm.controls[key].markAsTouched();
      });
    } else {
      this.result = this.calculatorService.calculateDeposit(
        +this.initial.value,
        +this.interest.value,
        +this.term.value,
        +this.contribution.value,
        this.contributionTimeFrame,
        this.capitalizationTimeFrame
      );
      this.calculatorResult.emit(this.result);
    }
  }
}
