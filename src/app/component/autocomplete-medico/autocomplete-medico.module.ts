import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AutocompleteMedicoComponent} from "./autocomplete-medico.component";
import {MaterialModule} from "../../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchMedicoDialogComponent} from "./search-medico-dialog/search-medico-dialog.component";
import {FlexModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    MatDialogModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AutocompleteMedicoComponent,
    SearchMedicoDialogComponent
  ],
  exports: [
    AutocompleteMedicoComponent,
    SearchMedicoDialogComponent
  ],
  providers: []
})
export class AutocompleteMedicoModule {}
