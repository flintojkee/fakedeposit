import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'phb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() control: FormControl;
  @Input() errorText: string;
  @Input() round: boolean;
  constructor() {}

  ngOnInit() {}

  isError() {
    return (
      this.control.invalid &&
      this.control.dirty &&
      this.control.touched
    );
  }
}
