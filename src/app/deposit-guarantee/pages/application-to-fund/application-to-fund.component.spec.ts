import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationToFundComponent } from './application-to-fund.component';

describe('ApplicationToFundComponent', () => {
  let component: ApplicationToFundComponent;
  let fixture: ComponentFixture<ApplicationToFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationToFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationToFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
