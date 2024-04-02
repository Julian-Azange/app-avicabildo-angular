import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEarningsComponent } from './form-earnings.component';

describe('FormEarningsComponent', () => {
  let component: FormEarningsComponent;
  let fixture: ComponentFixture<FormEarningsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEarningsComponent]
    });
    fixture = TestBed.createComponent(FormEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
