import {Component, Inject, OnInit} from "@angular/core";
import {UsuarioResourceService} from "../../../../resources/usuario-resource.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, Validators} from "@angular/forms";
import {first} from "rxjs";

@Component({
  selector: 'app-add-edit-usuario',
  templateUrl: './add-edit-usuario.component.html',
  styleUrls: ['./add-edit-usuario.componet.scss']
})
export class AddEditUsuarioComponent implements OnInit {
  invalidForm: boolean = false;
  inputdata: any;
  editdata: any;

  constructor(private resource: UsuarioResourceService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<AddEditUsuarioComponent>, private builder: FormBuilder,
              private service: UsuarioResourceService) {
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if(!!this.inputdata.code && !!this.inputdata.code.id){
      this.setData(this.inputdata.code);

      if (!!this.inputdata.view){
        this.form.disable();
      }
    }
  }

  setData(item: any) {
    this.service.get(item.id).subscribe(item => {
      this.editdata = item;
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();

      this.form.get('id')?.setValue(this.editdata.id);
      this.form.get('nome')?.setValue(this.editdata.nome);
      this.form.get('email')?.setValue(this.editdata.email);
      this.form.get('ativo')?.setValue(this.editdata.ativo);
      this.form.get('root')?.setValue(this.editdata.root);
    });
  }

  onClose() {
    this.ref.close(false);
  }

  form = this.builder.group({
    id: this.builder.control(''),
    nome: this.builder.control('', Validators.compose([Validators.required])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.compose([Validators.required])),
    ativo: this.builder.control(true),
    root: this.builder.control(false)
  });

  onSubmit() {
    const model = this.form.value;
    if (!!this.inputdata.view){
      return;
    }
    if (this.form.invalid) {
      this.toastr.error('Existem campos inválidos', 'Opa!');
      this.invalidForm = true;

      setTimeout(() => {this.invalidForm = false}, 2000);
    } else {
      if (!!model && !model.id && this.verificarSenha(model.password)){
        this.toastr.error('A senha deve conter ao menos 10 caracteres, letras, números e ao menos um caracter especial', 'Senha inválida!');
        return;
      }
      if (!!model && model.id){
        const _model = Object.assign({
          id: model.id,
          nome: model.nome,
          email: model.email,
          ativo: model.ativo,
          root: model.root
        })
        this.update(_model);
      } else {
        this.create(model);
      }
    }
  }

  verificarSenha(senha?: any): boolean {
    if (!senha) return false;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return !regex.test(senha);
  }

  update(model: any) {
    this.resource.update(model, model.id).pipe(first()).subscribe(res => {
      if (res){
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

  create(model: any) {
    this.resource.create(model).pipe(first()).subscribe(res => {
      if (res){
        this.toastr.success('Usuário cadastrado com sucesso', 'Sucesso!');
        this.ref.close(model);
      }
    }, error => {
      if (!!error.error && !!error.error.message && error.error.message === 'Duplicate record detected. Please check your input and try again.')
        this.toastr.error('Email já cadastrado', 'Opa!');
      else
        this.toastr.error('Erro ao atualizar usuário', 'Opa!');
    });
  }


}
