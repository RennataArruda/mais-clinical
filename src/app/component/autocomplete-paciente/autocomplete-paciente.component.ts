import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SearchPacienteDialogComponent} from "./search-paciente-dialog/search-paciente-dialog.component";

@Component({
    selector: 'app-autocomplete-paciente',
    template: `
      <mat-form-field class="w-100" >
        <mat-label class="color-primary">{{label}}</mat-label>
        <input matInput type="search" [(ngModel)]="valueString" [required]="required"
               (ngModelChange)="attValue($event)">
        <button mat-icon-button type="button" matSuffix (click)="open()">
          <mat-icon color="primary">search</mat-icon>
        </button>
      </mat-form-field>
    `,
    styles: [``]
})
export class AutocompletePacienteComponent implements OnInit {

  @Input()
  label: string = '';

  value: any = {};

  valueString: string = '';

  @Input()
    // @ts-ignore
  form: FormGroup;

  @Input()
  property: string = '';

  @Input()
  required: boolean = false;


  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  attValue(event: any) {
    this.value = event;
    this.valueString = event && event.id ? event.nome : '';
    this.form.get(this.property)?.setValue(event);
    this.form.get(this.property)?.updateValueAndValidity();
  }

  open() {
    var _popup = this.dialog.open(SearchPacienteDialogComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {}
    });
    _popup.afterClosed().subscribe(item => {
      if (!!item){
        this.attValue(item);
      }
    })
  }
}
