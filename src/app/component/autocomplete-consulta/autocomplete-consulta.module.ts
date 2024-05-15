import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {MaterialModule} from "../../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {AutocompleteconsultaComponent} from "./autocomplete-consulta.component";
import {SearchConsultaDialogComponent} from "./search-consulta-dialog/search-consulta-dialog.component";
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
    AutocompleteconsultaComponent,
    SearchConsultaDialogComponent
  ],
  exports: [
    AutocompleteconsultaComponent,
    SearchConsultaDialogComponent
  ],
  providers: []
})
export class AutocompleteConsultaModule {}
