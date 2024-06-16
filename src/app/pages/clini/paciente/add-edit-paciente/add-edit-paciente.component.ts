import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {PacienteResourceService} from "../../../../resources/paciente-resource.service";
import {first} from "rxjs";
import {PacienteInterface} from "../../../../interfaces/paciente.interface";

@Component({
  selector: 'app-add-edit-paciente',
  templateUrl: './add-edit-paciente.component.html',
  styleUrls: ['./add-edit-paciente.component.scss']
})
export class AddEditPacienteComponent implements OnInit {

  invalidForm: boolean = false;
  inputdata: any;
  editdata: any;

  cpfMask = '000.000.000-00';
  cnpjMask = '00.000.000/0000-00';

  constructor(private resource: PacienteResourceService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<AddEditPacienteComponent>, private builder: FormBuilder,
              private service: PacienteResourceService) {
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if(!!this.inputdata.code && !!this.inputdata.code.id){
      this.setData(this.inputdata.code)
    }
  }

  setData(item: PacienteInterface) {
    this.service.get(item.id).subscribe(item => {
      this.editdata = item;
      this.form.get('id')?.setValue(this.editdata.id);
      this.form.get('email')?.setValue(this.editdata.email);
      this.form.get('ativo')?.setValue(this.editdata.ativo);
      this.form.get('cpf')?.setValue(this.editdata.cpf);
      this.form.get('nome_completo')?.setValue(this.editdata.nome_completo);
      this.form.get('endereco')?.setValue(this.editdata.endereco);
      this.form.get('celular')?.setValue(this.editdata.celular);
      this.form.get('contato_adicional')?.setValue(this.editdata.contato_adicional);
      this.form.get('cns')?.setValue(this.editdata.cns);
      this.form.get('numero_carteira')?.setValue(this.editdata.numero_carteira);
      this.form.get('convenio_id')?.setValue(this.editdata.convenio_id);
      this.form.get('descricao_convenio')?.setValue(this.editdata.descricao_convenio);
      this.form.get('data_nascimento')?.setValue(this.editdata.data_nascimento);
    });
  }

  form = this.builder.group({
    id: this.builder.control(''),
    email: this.builder.control(''),
    ativo: this.builder.control(true),
    cpf: this.builder.control(''),
    nome_completo: this.builder.control(''),
    endereco: this.builder.control(''),
    celular: this.builder.control(''),
    contato_adicional: this.builder.control(''),
    cns: this.builder.control(''),
    numero_carteira: this.builder.control(''),
    convenio_id: this.builder.control(''), // Novo campo adicionado
    descricao_convenio: this.builder.control(''), // Novo campo adicionado
    data_nascimento: this.builder.control('') // Novo campo adicionado
  });


  onClose() {
    this.ref.close(false);
  }

  onSubmit() {
    const model = this.form.value;
    if (this.form.invalid) {
      this.toastr.error('Existem campos inválidos', 'Opa!');
      this.invalidForm = true;
      setTimeout(() => { this.invalidForm = false }, 2000);
      return; // Retorna para evitar a execução do restante da função se o formulário for inválido
    }
    if (!!model && model.id) {
      const convenio: any = model.descricao_convenio
      const _model = {
        id: model.id,
        nome_completo: model.nome_completo,
        ativo: model.ativo,
        email: model.email,
        cpf: model.cpf,
        endereco: model.endereco,
        celular: model.celular,
        contato_adicional: model.contato_adicional,
        cns: model.cns,
        numero_carteira: model.numero_carteira,
        convenio_id: convenio ? convenio.id : null,
        data_nascimento: model.data_nascimento
      };
      this.update(_model);
    } else {
      this.create(model);
    }
  }

  create(model: any) {
    this.resource.create(model).pipe(first()).subscribe(res => {
      if (res){
        this.toastr.success('Paciente cadastrado com sucesso', 'Sucesso!');
        this.ref.close(model);
      }
    }, error => {
      // Exibe o erro no console
      // console.log(error);

      if (!!error.error && !!error.error.message && error.error.message === 'Duplicate record detected. Please check your input and try again.')
        this.toastr.error('Paciente já cadastrado', 'Opa!');
      else
        this.toastr.error('Erro ao atualizar Paciente', 'Opa!');
    });
  }


  update(model: any) {
    // Verifica se model.id está definido e é válido
    if (model.id) {
      this.resource.update(model, model.id).pipe(first()).subscribe(res => {
        if (res){
          this.toastr.success('Paciente atualizado com sucesso', 'Sucesso!');
          this.ref.close(model);
        }
      }, error => {
        // Exibe o erro no console
        // console.log(error);

        if (!!error.message && error.message === 'Duplicate record detected. Please check your input and try again.')
          this.toastr.error('Email já cadastrado', 'Opa!');
        else
          this.toastr.error('Erro ao atualizar usuário', 'Opa!');
      });
    } else {
      // console.error('O ID do modelo não está definido ou é inválido.');
      // Trate esse caso conforme necessário, como exibindo uma mensagem de erro para o usuário.
    }
  }

  get cpfCnpjLenght(){
    return this.form.get('cpf')?.value?.length || 0;
  }

}
