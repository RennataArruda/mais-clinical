import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {first} from "rxjs";
import {MedicoResourceService} from "../../../../resources/medico-resource.service";
import {MedicoInterface} from "../../../../interfaces/medico.interface";

@Component({
  selector: 'app-add-edit-medico',
  templateUrl: './add-edit-medico.component.html',
  styleUrls: ['./add-edit-medico.component.scss']
})
export class AddEditMedicoComponent implements OnInit {

  invalidForm: boolean = false;
  inputdata: any;
  editdata: any;

  constructor(private resource: MedicoResourceService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<AddEditMedicoComponent>, private builder: FormBuilder,
              private service: MedicoResourceService) {
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if(!!this.inputdata.code && !!this.inputdata.code.id){
      this.setData(this.inputdata.code)
    }
  }

  setData(item: MedicoInterface) {
    this.service.get(item.id).subscribe(item => {
      this.editdata = item;
      this.form.get('id')?.setValue(this.editdata.id);
      this.form.get('email')?.setValue(this.editdata.email);
      this.form.get('cpf')?.setValue(this.editdata.cpf);
      this.form.get('nome')?.setValue(this.editdata.nome);
      this.form.get('endereco')?.setValue(this.editdata.endereco);
      this.form.get('celular')?.setValue(this.editdata.celular);
      this.form.get('contato_adicional')?.setValue(this.editdata.contato_adicional);
      this.form.get('crm')?.setValue(this.editdata.crm);
      this.form.get('conselho')?.setValue(this.editdata.conselho);
      this.form.get('uf_conselho')?.setValue(this.editdata.uf_conselho);
      this.form.get('especialidade')?.setValue(this.editdata.especialidade);
      this.form.get('data_cadastro')?.setValue(this.editdata.data_cadastro);
    });
  }

    form = this.builder.group({
      id: this.builder.control(''),
      email: this.builder.control(''),
      cpf: this.builder.control(''),
      nome: this.builder.control(''),
      endereco: this.builder.control(''),
      celular: this.builder.control(''),
      contato_adicional: this.builder.control(''),
      crm: this.builder.control(''),
      conselho: this.builder.control(''),
      uf_conselho: this.builder.control(''),
      especialidade: this.builder.control(''),
      data_cadastro: this.builder.control('')
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
      const _model = {
        id: model.id,
        nome_completo: model.nome,
        email: model.email,
        cpf: model.cpf,
        endereco: model.endereco,
        celular: model.celular,
        contato_adicional: model.contato_adicional,
        crm: model.crm,
        conselho: model.conselho,
        uf_conselho: model.uf_conselho,
        especialidade: model.especialidade,
        data_cadastro: model.data_cadastro
      };
      this.update(_model);
    } else {
      this.create(model);
    }
  }

  create(model: any) {
    this.resource.create(model).pipe(first()).subscribe(res => {
      if (res){
        this.toastr.success('Medico cadastrado com sucesso', 'Sucesso!');
        this.ref.close(model);
      }
    }, error => {
      // Exibe o erro no console
      console.log(error);

      if (!!error.error && !!error.error.message && error.error.message === 'Duplicate record detected. Please check your input and try again.')
        this.toastr.error('Email já cadastrado', 'Opa!');
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
        console.log(error);

        if (!!error.message && error.message === 'Duplicate record detected. Please check your input and try again.')
          this.toastr.error('Email já cadastrado', 'Opa!');
        else
          this.toastr.error('Erro ao atualizar usuário', 'Opa!');
      });
    } else {
      console.error('O ID do modelo não está definido ou é inválido.');
      // Trate esse caso conforme necessário, como exibindo uma mensagem de erro para o usuário.
    }
  }

}
