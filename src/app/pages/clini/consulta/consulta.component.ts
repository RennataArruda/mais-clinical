import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ConsultaResourceService} from "../../../resources/consulta-resource.service";
import {MatTableDataSource} from "@angular/material/table";
import {first} from 'rxjs';
import {FormBuilder} from "@angular/forms";
import {AgendarConsultaComponent} from "./agenda-consulta/agendar-consulta.component";
import {EditarConsultaComponent} from "./editar-consulta/editar-consulta.component";
import { ConfirmDialogService } from 'src/app/component/dialogs/confirm/confirm-dialog.service';
import {VisualizarConsultaComponent} from "./visualizar-consulta/visualizar-consulta.component";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  providers: [ConfirmDialogService]
})
export class ConsultaComponent implements OnInit, OnDestroy {

  result: any[] = [];

  dataPagination: any;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;

  totalRecords: number = 0;
  pageSize: number = 5;
  pageEvent: any;

  displayedColumns: string[] = ["medico", "paciente", "dataAgendamento", "horario", "visualizar", "editar", "comprovante", "cancelar"];

  constructor(private resource: ConsultaResourceService,
              private attAuth: AuthService,
              private toastr: ToastrService,
              private builder: FormBuilder,
              private dialog: MatDialog,
              private dialogService: ConfirmDialogService
  ) {
  }

  form = this.builder.group({
    data_consulta: this.builder.control(''),
    medico: this.builder.control({}),
    paciente: this.builder.control({}),
  });

  ngOnInit() {
    this.attAuth.validarUsuario();
    this.search();
    console.log(this.result);
  }

  ngOnDestroy() {}


  onView(item: any) {
    this.openModal('Visualizar Consulta', VisualizarConsultaComponent, item);
  }

  getData(){
    return this.result;
  }

  onEdit(item: any){
    this.openModal('Editar Consulta', EditarConsultaComponent, item);
  }
  onCancel(item: any){
    const message = item.ativo ? 'Deseja realmente cancelar este agendamento?';
    this.dialogService.openConfirm(item, message).subscribe(result => {
      if (result) {
        const _model = {
          ativo : !item.ativo
        }
        this.resource.can(_model, item.id).subscribe(response => {
          this.toastr.success('Operação realizada com sucesso!', 'Sucesso!');
          this.search();
        }, error => {
          this.toastr.error(error.error.message || 'Erro ao processar a requisição', 'Opa!');
        });
      }
    });
    ;
  }
  openModal(title: any, component: any, code?: any) {
    const _popup = this.dialog.open(component, {
      maxWidth: '100vw',
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {})
  }

  onAdd(){
    this.openModal('Marcar Consulta', AgendarConsultaComponent);
  }

  consultar(){
    const data_consulta = this.form.get('data_consulta')?.value;
    const medico = this.form.get('medico')?.value as any;
    const paciente = this.form.get('paciente')?.value as any;

    const _search = {
      data_consulta: data_consulta,
      medico_id: medico.id,
      paciente_id: paciente.id
    }

    this.search(_search);
  }

  search(search?: any){
    this.resource.search(search).pipe(first()).subscribe(response => {
      this.result = response.sort((a, b) => {
        const dateA = new Date(a.data_consulta);
        const dateB = new Date(b.data_consulta);
        return dateB.getTime() - dateA.getTime();
      });
      this.totalRecords = this.result.length;
      this.onPaginateChange({pageIndex: 0, pageSize: this.pageSize});
      console.log(this.result);
    }, error => {
      this.toastr.error(error, 'Opa!');
      console.log(this.getData())
    });
  }

  onPaginateChange(event: any) {
    const pageSize = 5;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    if (startIndex >= this.getData().length) {
      this.dataPagination = new MatTableDataSource([]);
    }

    this.dataPagination = new MatTableDataSource(this.getData().slice(startIndex, endIndex));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataPagination.filter = filterValue.trim().toLowerCase();

    if (this.dataPagination.paginator) {
      this.dataPagination.paginator.firstPage();
    }
  }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}
