import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositTaxComponent } from './deposit-tax.component';

describe('DepositTaxComponent', () => {
  let component: DepositTaxComponent;
  let fixture: ComponentFixture<DepositTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
