import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from './ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  exports: [
    InputsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class SharedModule {}
