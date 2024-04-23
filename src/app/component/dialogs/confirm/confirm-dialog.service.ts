import {Injectable} from "@angular/core";
import {UsuarioResourceService} from "../../../resources/usuario-resource.service";
import {AuthService} from "../../../services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ConfirmDialogComponent} from "./confirm-dialog.component";

@Injectable()
export class ConfirmDialogService {
  constructor(private attAuth: AuthService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
  }

  openConfirm(model: any, message: string): Observable<any> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        message: message
      }
    }).afterClosed();
    // _popup.afterClosed().subscribe(item => {
    //   if (item) {
    //     const _model = {
    //       ativo : !model.ativo
    //     }
    //     this.resource.ativarOrNot(_model, model.id).subscribe(response => {
    //       this.toastr.success('Operação realizada com sucesso!', 'Sucesso!');
    //       this.search();
    //     }, error => {
    //       this.toastr.error(error.error.message || 'Erro ao processar a requisição', 'Opa!');
    //     });
    //   }
    // })
  }
}
