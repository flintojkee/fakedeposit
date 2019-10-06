import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'fd-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent implements OnInit {
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() step = 1;
  @Input() min: number;
  @Input() max: number;
  @Input() control: FormControl;
  @Output() valueChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  increment() {
    const currentValue = this.control.value;
    if ((currentValue + this.step) <= this.max ) {
      this.control.setValue(this.control.value + this.step);
      this.control.markAsDirty();
    }
    this.valueChanged.emit();
  }

  decrement() {
    const currentValue = this.control.value;
    if ((currentValue - this.step) >= this.min ) {
      this.control.setValue(this.control.value - this.step);
      this.control.markAsDirty();
    }
    this.valueChanged.emit();
  }

}
