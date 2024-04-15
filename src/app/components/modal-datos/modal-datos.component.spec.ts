import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatosComponent } from './modal-datos.component';

describe('ModalDatosComponent', () => {
  let component: ModalDatosComponent;
  let fixture: ComponentFixture<ModalDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDatosComponent]
    });
    fixture = TestBed.createComponent(ModalDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
