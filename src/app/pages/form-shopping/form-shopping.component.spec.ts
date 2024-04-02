import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormShoppingComponent } from './form-shopping.component';

describe('FormShoppingComponent', () => {
  let component: FormShoppingComponent;
  let fixture: ComponentFixture<FormShoppingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormShoppingComponent]
    });
    fixture = TestBed.createComponent(FormShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
