import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ButtonComponent } from './button/button.component';
import { InputNumberComponent } from './input-number/input-number.component';

@NgModule({
  declarations: [InputComponent, CheckboxComponent, ButtonComponent, InputNumberComponent],
  exports: [InputComponent, CheckboxComponent, ButtonComponent, InputNumberComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class InputsModule {}
