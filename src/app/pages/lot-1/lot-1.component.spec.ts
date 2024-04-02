import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lot1Component } from './lot-1.component';

describe('Lot1Component', () => {
  let component: Lot1Component;
  let fixture: ComponentFixture<Lot1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Lot1Component]
    });
    fixture = TestBed.createComponent(Lot1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
