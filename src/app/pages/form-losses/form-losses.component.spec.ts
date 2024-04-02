import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLossesComponent } from './form-losses.component';

describe('FormLossesComponent', () => {
  let component: FormLossesComponent;
  let fixture: ComponentFixture<FormLossesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLossesComponent]
    });
    fixture = TestBed.createComponent(FormLossesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
