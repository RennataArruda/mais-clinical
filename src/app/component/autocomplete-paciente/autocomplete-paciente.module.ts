import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {MaterialModule} from "../../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {AutocompletePacienteComponent} from "./autocomplete-paciente.component";
import {SearchPacienteDialogComponent} from "./search-paciente-dialog/search-paciente-dialog.component";
import {AutocompleteMedicoModule} from "../autocomplete-medico/autocomplete-medico.module";

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    MatDialogModule,
    MatDividerModule,
    MatPaginatorModule,
    AutocompleteMedicoModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AutocompletePacienteComponent,
    SearchPacienteDialogComponent
  ],
  exports: [
    AutocompletePacienteComponent,
    SearchPacienteDialogComponent
  ],
  providers: []
})
export class AutocompletePacienteModule {}
