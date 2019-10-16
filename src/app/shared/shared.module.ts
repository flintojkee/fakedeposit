import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule, PageHeaderComponent } from './ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [PageHeaderComponent],
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
    NgxChartsModule,
    PageHeaderComponent
  ]
})
export class SharedModule {}
