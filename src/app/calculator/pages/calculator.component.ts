import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalculatorService } from '../shared/services/calculator.service';

@Component({
  selector: 'fd-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  result: number;
  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.createForm();
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
