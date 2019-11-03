import { Injectable } from '@angular/core';
import { FormService } from '@fd/core/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OptionalType, fieldsValidators } from '@fd/shared/models';
import { Calculator } from '@fd/shared/models/calculator.model';
import { requiredValidator } from '@fd/shared/ui';

export enum TimeFrame {
  monthly = 1,
  quarterly = 4,
  yearly = 12,
  none = 0
}
export interface CalculatorResult {
  interestArray: number[];
  contributionArray: number[];
  resultArray: number[];
  resultValue: number;
  contributionValue: number;
  initialValue: number;
  interestValue: number;
}
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor(private formService: FormService, private formBuilder: FormBuilder) {}

  createCalculatorForm(): FormGroup {
    const initialValues: OptionalType<Calculator> = new Calculator();
    const validators: fieldsValidators<Calculator> = {
      initial: [requiredValidator()],
      interest: [requiredValidator()],
      term: [requiredValidator()],
      contribution: []
    };

    const controls = this.formService.createFormControls(initialValues, validators);

    return this.formBuilder.group(controls);
  }

  calculateDeposit(
    initial: number,
    interest: number,
    term: number,
    contribution = 0,
    contributionFrame = term,
    capitalizationFrame = term
  ): CalculatorResult {
    if (capitalizationFrame === TimeFrame.none) {
      capitalizationFrame = term;
    }
    let summ = initial;
    const result: CalculatorResult = {
      interestArray: [0],
      contributionArray: [0],
      resultArray: [0],
      resultValue: 0,
      contributionValue: 0,
      initialValue: 0,
      interestValue: 0
    };
    for (let i = 1; i <= term; i++) {
      result.interestArray.push((summ * interest) / 12 / 100);
      if (i % contributionFrame === 0 && i < term) {
        summ += contribution;
        result.contributionArray.push(contribution);
      }
      if (i % capitalizationFrame === 0) {
        summ += result.interestArray.slice(-capitalizationFrame).reduce((acc, curr) => acc + curr);
        result.resultArray.push(summ);
      }
    }
    result.resultValue = summ;
    result.contributionValue = result.contributionArray.reduce((acc, curr) => acc + curr);
    result.initialValue = initial;
    result.interestValue = result.interestArray.reduce((acc, curr) => acc + curr);
    return result;
  }
}
