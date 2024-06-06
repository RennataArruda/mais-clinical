import {Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ConsultaResourceService} from "../../../resources/consulta-resource.service";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditConsultaComponent} from "./add-edit-consulta/add-edit-consulta.component";
import {first} from 'rxjs';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent {

  result: any[] = [];

  dataPagination: any;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;

  totalRecords: number = 0;
  pageSize: number = 5;
  pageEvent: any;

  displayedColumns: string[] = ["medico", "paciente", "dataAgendamento", "horario", "visualizar", "editar", "comprovante", "apagar"];

  constructor(private resource: ConsultaResourceService,
              private attAuth: AuthService,
              private toastr: ToastrService,
              private dialog: MatDialog,
  ) {
  }


  ngOnInit() {
    this.attAuth.validarUsuario();
    this.search();
    console.log(this.result);
  }

  ngOnDestroy() {}

  openModal(code: any, title: any,component:any, view?: boolean) {
    var _popup = this.dialog.open(component, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
        view: view,
      }
    });

    _popup.afterClosed().subscribe(item => {
      console.log(item)
      this.search();
    })
  }


  onView(item: any) {
    this.openModal(item, 'Visualizar Consulta', AddEditConsultaComponent, true);
  }

  getData(){
    return this.result;
  }

  onAdd(){
    this.openModal({}, 'Adicionar Consulta', AddEditConsultaComponent);
  }

  onEdit(item: any){
    this.openModal(item, 'Editar Consulta', AddEditConsultaComponent);
  }

  onDelete(item: any){
    this.delete(item)
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

  search(){
    this.resource.search().subscribe(response => {

      this.result = response.sort((a, b) => a.id - b.id);
      this.totalRecords = this.result.length;
      this.onPaginateChange({pageIndex: 0, pageSize: this.pageSize})
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

  delete(model: any) {
    // Verifica se o ID do paciente está definido e é válido
    if (model.id) {
      this.resource.delete(model.id).pipe(first()).subscribe(res => {
        if (res) {
          this.toastr.success('Consulta deletada com sucesso', 'Sucesso!');
          // Execute qualquer outra lógica necessária após a exclusão do paciente
        }
      }, error => {
        // Exibe o erro no console
        console.log(error);
        // Trate o erro conforme necessário, como exibir uma mensagem de erro para o usuário
        this.toastr.error('Erro ao deletar consulta', 'Erro!');
      });
    } else {
      console.error('O ID da consulta não está definido ou é inválido.');
      // Trate esse caso conforme necessário, como exibindo uma mensagem de erro para o usuário.
    }
  }



}
