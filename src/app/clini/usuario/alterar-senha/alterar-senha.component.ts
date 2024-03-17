import {Component, Inject, OnInit} from "@angular/core";
import {UsuarioResourceService} from "../../../resources/usuario-resource.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html'
})
export class AlterarSenhaComponent implements OnInit {
  invalidForm: boolean = false;
  inputdata: any;
  usuario: any;

  constructor(private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<AlterarSenhaComponent>, private builder: FormBuilder,
              private service: UsuarioResourceService) {
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if(!!this.inputdata.code && !!this.inputdata.code.id){
      this.setData(this.inputdata.code)
    }
  }

  setData(item: any) {
    this.service.get(item.id).subscribe(item => {
      this.usuario = item;
    });
  }

  onClose() {
    this.ref.close(false);
  }

  form = this.builder.group({
    oldSenha: this.builder.control('', Validators.compose([Validators.required])),
    newSenha: this.builder.control('', Validators.compose([Validators.required])),
  });

  onSubmit() {
    const model = this.form.value;
    if (this.form.invalid) {
      this.toastr.error('Existem campos inválidos', 'Opa!');
      this.invalidForm = true;

      setTimeout(() => {this.invalidForm = false}, 2000);
    } else {
      if (model.newSenha === model.oldSenha){
        this.toastr.error('A nova senha não pode ser igual a senha atual', 'Senha inválida!');
        return;
      }
      if (!!model && this.verificarSenha(model.newSenha)){
        this.toastr.error('A senha deve conter ao menos 8 caracteres, letras, números e ao menos um caracter especial', 'Senha inválida!');
        return;
      }

      const _model = Object.assign(this.usuario, {
        password: model.newSenha
      })
      this.update(_model);
    }
  }

  verificarSenha(senha?: any): boolean {
    if (!senha) return false;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return !regex.test(senha);
  }

  update(model: any) {
    this.service.alterarSenha(model, model.id).pipe(first()).subscribe(res => {
      if (res) {
        this.toastr.success('Usuário atualizado com sucesso', 'Sucesso!');
        this.ref.close(model);
      }
    }, error => {
      if (!!error.message && error.message === 'Duplicate record detected. Please check your input and try again.')
        this.toastr.error('Email já cadastrado', 'Opa!');
      else
        this.toastr.error('Erro ao atualizar usuário', 'Opa!');
    });
  }
}
