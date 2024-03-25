import {NgModule} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MaterialModule} from "../material.module";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {CommonModule} from "@angular/common";
import {BodyComponent} from "./body/body.component";
import {MatIconModule} from "@angular/material/icon";
import {UsuarioComponent} from "./usuario/usuario.component";
import {MatTableModule} from "@angular/material/table";
import {FlexModule} from "@angular/flex-layout/flex";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {AddEditUsuarioComponent} from "./usuario/add-edit-usuario/add-edit-usuario.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {AlterarSenhaComponent} from "./usuario/alterar-senha/alterar-senha.component";
import {ConfirmDialogComponent} from "../component/dialogs/confirm/confirm-dialog.component";
import {PacienteComponent} from "./paciente/paciente.component";

@NgModule({
  imports: [
    MatCardModule,
    MaterialModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    FlexModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule
  ],
  exports: [
    MatCardModule,
    MaterialModule,
    CommonModule,
    SidenavComponent,
    BodyComponent,
    UsuarioComponent,
    MatTableModule,
    FlexModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    AddEditUsuarioComponent,
    MatDividerModule,
    PacienteComponent
  ],
  declarations: [
    SidenavComponent,
    BodyComponent,
    UsuarioComponent,
    AddEditUsuarioComponent,
    AlterarSenhaComponent,
    ConfirmDialogComponent,
    PacienteComponent
  ],
  bootstrap: [
    SidenavComponent,
    BodyComponent,
    UsuarioComponent,
    AddEditUsuarioComponent,
    AlterarSenhaComponent,
    ConfirmDialogComponent
  ]
})
export class CliniModules { }
