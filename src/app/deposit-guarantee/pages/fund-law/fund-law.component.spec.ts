import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundLawComponent } from './fund-law.component';

describe('FundLawComponent', () => {
  let component: FundLawComponent;
  let fixture: ComponentFixture<FundLawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundLawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
