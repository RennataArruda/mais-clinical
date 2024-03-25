import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPacienteComponent } from './add-edit-paciente.component';

describe('AddEditPacienteComponent', () => {
  let component: AddEditPacienteComponent;
  let fixture: ComponentFixture<AddEditPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPacienteComponent]
    });
    fixture = TestBed.createComponent(AddEditPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
