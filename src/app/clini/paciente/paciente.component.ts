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

  displayedColumns: string[] = ["cpf", "nome", "dataNascimento"];

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

  openModal(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      console.log(item)
      this.search();
    })
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
    this.resource.search().pipe().subscribe(response => {
      this.result = response.sort((a, b) => a.id - b.id);
      this.dataPagination = new MatTableDataSource(this.getData());
      this.totalRecords = this.dataPagination.data.length;
      this.dataPagination.paginator = this.paginator;
    }, error => {
      this.toastr.error(error, 'Opa!');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataPagination.filter = filterValue.trim().toLowerCase();

    if (this.dataPagination.paginator) {
      this.dataPagination.paginator.firstPage();
    }
  }


}
