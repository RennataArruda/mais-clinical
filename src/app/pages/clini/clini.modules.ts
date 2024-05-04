import {NgModule} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MaterialModule} from "../../material.module";
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
import {ConfirmDialogComponent} from "../../component/dialogs/confirm/confirm-dialog.component";
import {PacienteComponent} from "./paciente/paciente.component";
import {AddEditPacienteComponent} from "./paciente/add-edit-paciente/add-edit-paciente.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {DataFormatPipe} from "../../services/utils/data-format.pipe";
import {AgendarConsultaComponent} from "./body/agenda-consulta/agendar-consulta.component";
import {HorariosMedicoComponent} from "./body/agenda-consulta/horarios-medico/horarios-medico.component";
import {SelectConvenioComponent} from "../../component/select-convenio/select-convenio.component";
import {MedicoComponent} from "./medico/medico.component";
import {AddEditMedicoComponent} from "./medico/add-edit-medico/add-edit-medico.component";
import {AutocompleteMedicoModule} from "../../component/autocomplete-medico/autocomplete-medico.module";
import {AutocompletePacienteModule} from "../../component/autocomplete-paciente/autocomplete-paciente.module";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {CpfCnpjMaskPipe} from "../../component/pipe/pipeCpfCnpj";

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
    MatDividerModule,
    MatDatepickerModule,
    MatSelectModule,
    DataFormatPipe,
    AutocompleteMedicoModule,
    AutocompletePacienteModule,
    NgxMaskDirective,
    NgxMaskPipe
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
      PacienteComponent,
      AgendarConsultaComponent,
      HorariosMedicoComponent,
      SelectConvenioComponent,
      PacienteComponent,
      MedicoComponent,
      AddEditMedicoComponent
  ],
  declarations: [
    SidenavComponent,
    BodyComponent,
    UsuarioComponent,
    AddEditUsuarioComponent,
    AlterarSenhaComponent,
    ConfirmDialogComponent,
    PacienteComponent,
    AddEditPacienteComponent,
    AgendarConsultaComponent,
    HorariosMedicoComponent,
    SelectConvenioComponent,
    AddEditPacienteComponent,
    MedicoComponent,
    AddEditMedicoComponent
  ],
  bootstrap: [
    SidenavComponent,
    BodyComponent,
    UsuarioComponent,
    AddEditUsuarioComponent,
    AlterarSenhaComponent,
    ConfirmDialogComponent,
    AgendarConsultaComponent
  ],
  providers: [
    provideNgxMask()
  ]
})
export class CliniModules { }
