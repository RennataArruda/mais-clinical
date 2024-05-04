import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {CpfCnpjMaskPipe} from "./component/pipe/pipeCpfCnpj";


export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@NgModule({
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CpfCnpjMaskPipe,
  ],
  declarations: [
    CpfCnpjMaskPipe,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT }
  ]
})
export class MaterialModule { }
