import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTablesModalComponent } from './empty-tables-modal.component';

describe('EmptyTablesModalComponent', () => {
  let component: EmptyTablesModalComponent;
  let fixture: ComponentFixture<EmptyTablesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTablesModalComponent]
    });
    fixture = TestBed.createComponent(EmptyTablesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
