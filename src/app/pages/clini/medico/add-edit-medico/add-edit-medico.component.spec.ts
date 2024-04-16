import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMedicoComponent } from './add-edit-medico.component';

describe('AddEditMedicoComponent', () => {
  let component: AddEditMedicoComponent;
  let fixture: ComponentFixture<AddEditMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditMedicoComponent]
    });
    fixture = TestBed.createComponent(AddEditMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
