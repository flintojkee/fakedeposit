import { Injectable } from '@angular/core';
import { FormService } from '@fd/core/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OptionalType, fieldsValidators } from '@fd/shared/models';
import { Calculator } from '@fd/shared/models/calculator.model';
import { requiredValidator } from '@fd/shared/ui';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {}

  createCalculatorForm(): FormGroup {
    const initialValues: OptionalType<Calculator> = new Calculator();
    const validators: fieldsValidators<Calculator> = {
      initial: [requiredValidator()],
      interest: [requiredValidator()],
      term: [requiredValidator()]
    };

    const controls = this.formService.createFormControls(initialValues, validators);

    return this.formBuilder.group(controls);
  }

  calculateDeposit(initial: number, interest: number, term: number) {
    return initial * Math.pow(1 + interest / 100, term);
  }


}
