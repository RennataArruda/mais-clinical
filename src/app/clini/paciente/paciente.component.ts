import {Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {UsuarioResourceService} from "../../resources/usuario-resource.service";
import {AuthService} from "../../services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {PacienteResourceService} from "../../resources/paciente-resource.service";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditUsuarioComponent} from "../usuario/add-edit-usuario/add-edit-usuario.component";
import {ConfirmDialogComponent} from "../../component/dialogs/confirm/confirm-dialog.component";
import {AddEditPacienteComponent} from "./add-edit-paciente/add-edit-paciente.component";
import {first} from "rxjs";

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent {

  result: any[] = [];

  dataPagination: any;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;

  totalRecords: number = 0;
  pageSize: number = 5;
  pageEvent: any;

  displayedColumns: string[] = ["cpf", "nome_completo", "dataNascimento", "visualizar", "editar", "apagar"];

  constructor(private resource: PacienteResourceService,
              private attAuth: AuthService,
              private toastr: ToastrService,
              private dialog: MatDialog,
  ) {
  }


  ngOnInit() {
    this.attAuth.validarUsuario();
    this.search();
  }

  ngOnDestroy() {}

  openModal(code: any, title: any,component:any, view?: boolean) {
    var _popup = this.dialog.open(component, {
      width: '50%',
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
    this.openModal(item, 'Visualizar Paciente', AddEditPacienteComponent, true);
  }

  getData(){
    return this.result;
  }

  onAdd(){
    this.openModal({}, 'Adicionar Paciente', AddEditPacienteComponent);
  }

  onEdit(item: any){
    this.openModal(item, 'Editar Paciente', AddEditPacienteComponent);
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
      // Exibe o objeto retornado no console
      console.log(response);

      this.result = response.sort((a, b) => a.id - b.id);
      this.dataPagination = new MatTableDataSource(this.getData());
      this.totalRecords = this.dataPagination.data.length;
      this.dataPagination.paginator = this.paginator;
    }, error => {
      this.toastr.error(error, 'Opa!');
      console.log(this.getData())
    });
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
          this.toastr.success('Paciente deletado com sucesso', 'Sucesso!');
          // Execute qualquer outra lógica necessária após a exclusão do paciente
        }
      }, error => {
        // Exibe o erro no console
        console.log(error);
        // Trate o erro conforme necessário, como exibir uma mensagem de erro para o usuário
        this.toastr.error('Erro ao deletar paciente', 'Erro!');
      });
    } else {
      console.error('O ID do paciente não está definido ou é inválido.');
      // Trate esse caso conforme necessário, como exibindo uma mensagem de erro para o usuário.
    }
  }



}
