import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fd-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type = 'text';
  @Input() patternError = 'Invalid format';
  @Input() placeholder = '';
  @Input() control: FormControl;
  @Input() fontSize = '16';

  constructor() {}

  ngOnInit() {}

  getError() {
    const { errors } = this.control;
    return errors && errors[Object.keys(errors)[0]];
  }

  isError() {
    return this.control.invalid && this.control.dirty && this.control.touched;
  }
}
