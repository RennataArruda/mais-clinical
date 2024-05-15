import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditConsultaComponent } from './add-edit-consulta.component'; // Import the missing component

describe('AddEditConsultaComponent', () => {
  let component: AddEditConsultaComponent;
  let fixture: ComponentFixture<AddEditConsultaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditConsultaComponent]
    });
    fixture = TestBed.createComponent(AddEditConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
