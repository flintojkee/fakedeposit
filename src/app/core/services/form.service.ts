import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, AbstractControlOptions } from '@angular/forms';
import { OptionalType, fieldsValidators } from '@root/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor() {}

  createFormControls<T>(
    initialValues: OptionalType<T>,
    validators: fieldsValidators<OptionalType<T>>
  ): { [key: string]: AbstractControl } {
    return Object.keys(initialValues).reduce((previous, key) => {
      previous[key] = new FormControl(initialValues[key], validators[
        key
      ] as AbstractControlOptions);
      return previous;
    }, {});
  }
}
