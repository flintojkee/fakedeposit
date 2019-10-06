import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from './ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, InputsModule, FormsModule, ReactiveFormsModule],
  exports: [InputsModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
