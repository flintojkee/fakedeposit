import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'fd-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type: string;
  @Input() color: string;
  @Input() isDisabled: boolean;
  @Input() label: string;
  @Input() iconPos: 'left' | 'right' = 'left';
  @Input() icon: string;
  @Input() isLoading = false;
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
