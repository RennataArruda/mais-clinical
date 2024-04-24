import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {UsuarioResourceService} from "../../../resources/usuario-resource.service";
import {AuthService} from "../../../services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {AddEditUsuarioComponent} from "./add-edit-usuario/add-edit-usuario.component";
import {AlterarSenhaComponent} from "./alterar-senha/alterar-senha.component";
import {ConfirmDialogService} from "../../../component/dialogs/confirm/confirm-dialog.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [ConfirmDialogService]
})
export class UsuarioComponent implements OnInit, OnDestroy {

  result: any[] = [];

  dataPagination: any;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;

  totalRecords: number = 0;
  pageSize: number = 5;
  pageEvent: any;

  displayedColumns: string[] = ["ativo", "id", "nome", "email", "root","visualizar", "editar", "inativar"];

  constructor(private resource: UsuarioResourceService,
              private attAuth: AuthService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private dialogService: ConfirmDialogService) {
  }

  ngOnInit() {
    this.attAuth.validarUsuario();
    this.search();

  }

  ngOnDestroy() {}

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

  getData(){
    return this.result;
  }

  openModal(code: any, title: any,component:any, view?: boolean) {
    var _popup = this.dialog.open(component, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
        view: view
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.search();
    })
  }

  onAdd(){
    this.openModal({}, 'Adicionar Usuário', AddEditUsuarioComponent);
  }

  onEdit(item: any){
    this.openModal(item, 'Editar Usuário', AddEditUsuarioComponent);
  }

  onView(item: any) {
    this.openModal(item, 'Visualizar Usuário', AddEditUsuarioComponent, true);
  }

  inativar(item: any){
    const message = item.ativo ? 'Deseja realmente inativar o usuário?' : 'Deseja realmente ativar o usuário?';
    this.dialogService.openConfirm(item, message).subscribe(result => {
      if (result) {
        const _model = {
          ativo : !item.ativo
        }
        this.resource.ativarOrNot(_model, item.id).subscribe(response => {
          this.toastr.success('Operação realizada com sucesso!', 'Sucesso!');
          this.search();
        }, error => {
          this.toastr.error(error.error.message || 'Erro ao processar a requisição', 'Opa!');
        });
      }
    });
  }

  alterarSenha(item: any){
    this.openModal(item, 'Editar Usuário', AlterarSenhaComponent);
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
