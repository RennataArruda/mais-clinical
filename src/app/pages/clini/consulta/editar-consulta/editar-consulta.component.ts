import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {ConsultasMedicoService} from "../../../../resources/consultas-medico.service";
import {ConsultaResourceService} from "../../../../resources/consulta-resource.service";
import {first} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-editar-consulta',
  templateUrl: './editar-consulta.component.html',
  styleUrls: ['./editar-consulta.component.scss'],
  providers: [DatePipe]
})
export class EditarConsultaComponent implements OnInit, OnDestroy {

  inputdata: any;
  editdata: any;

  dataSearch: any;
  horariosMedico: string[] = [];
  clean: number = 0;
  horarioSelecionado: any;
  horarioInicial: any;


  constructor(private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<EditarConsultaComponent>, private builder: FormBuilder,
              private service: ConsultasMedicoService,
              private resource: ConsultaResourceService,
              private datePipe: DatePipe) {
  }

  form = this.builder.group({
    id: this.builder.control(null),
    data_consulta: this.builder.control(null, Validators.required),
    horario: this.builder.control('', Validators.required),
    outras_informacoes: this.builder.control(''),
    paciente_id: this.builder.control(null),
    paciente: this.builder.control(null, Validators.required),
    medico_id: this.builder.control(null),
    medico: this.builder.control(null, Validators.required),
    _paciente_obj: this.builder.control(null),
    _medico_obj: this.builder.control(null),
  });


  ngOnInit() {
    this.inputdata = this.data;
    if(!!this.inputdata.code && !!this.inputdata.code.id){
      this.setData(this.inputdata.code)
    }
  }

  setData(item: any) {
    this.resource.get(item.id).subscribe(item => {
      this.editdata = item;
      this.form.get('id')?.setValue(this.editdata.id);
      this.form.get('data_consulta')?.setValue(this.editdata.data_consulta);
      this.form.get('outras_informacoes')?.setValue(this.editdata.outras_informacoes);
      this.form.get('paciente_id')?.setValue(this.editdata.paciente_id);
      this.form.get('paciente')?.setValue(this.editdata?._paciente_obj?.nome_completo);
      this.form.get('medico_id')?.setValue(this.editdata.medico_id);
      this.form.get('medico')?.setValue(this.editdata?._medico_obj?.nome);
      this.form.get('_paciente_obj')?.setValue(this.editdata._paciente_obj);
      this.form.get('_medico_obj')?.setValue(this.editdata._medico_obj);

      this.form.get('data_consulta')?.disable();
      this.form.get('medico')?.disable();
      this.form.get('paciente')?.disable();

      this.searchHorariosMedico();
    });
  }

  public searchHorariosMedico(){
    const data = this.form.get('data_consulta')?.value;
    // @ts-ignore
    const idMedico = this.form.get('medico_id')?.value;

    if (!data || !idMedico)
      return;

    this.dataSearch = this.datePipe.transform(data, 'yyyy-MM-dd');
    const search = Object.assign({}, {
      medico_id: idMedico,
      data_consulta: this.dataSearch
    })
    this.service.search(search).pipe(first(), finalize(() => {
      this.horarioSelecionado = Object.assign({
        hora: this.editdata.horario,
        disponivel: true,
        selecionado: false
      });

      this.horarioInicial = Object.assign({
        hora: this.editdata.horario,
        disponivel: true,
        selecionado: false
      })
      this.form.get('horario')?.setValue(this.horarioSelecionado);
    })).subscribe(
      (horarios: any) => {
        if (horarios && horarios.length > 0){
          this.horariosMedico = horarios.map((item: any) => item.horario);
        } else {
          this.horariosMedico = [];
        }
      }
    );

  }

  atualizarHorarioSelecionado(horario: any) {
    this.horarioSelecionado = horario;
    const horarioControl = this.form.get('horario');
    horarioControl?.setValue(horario);
    horarioControl?.updateValueAndValidity();
  }

  ngOnDestroy() {
  }

  onSubmit() {

    const value = this.form.value;
    if (this.form.invalid){
      this.toastr.error('Existem campos inválidos', 'Opa!');
      return;
    }

    const model = this.transformModal(value);
    this.resource.update(model, model.id).pipe(first()).subscribe(response => {
      if (response){
        this.toastr.success('Consulta atualizada com sucesso!', 'Sucesso!');
        this.ref.close(model);
      }
    }, error => {
      console.log('error', error);
    });

  }

  private transformModal(value: any){
    return Object.assign({},{
      id: value.id,
      paciente_id: value.paciente_id,
      medico_id: value.medico_id,
      data_consulta: this.datePipe.transform(value.data_consulta, 'yyyy-MM-dd'),
      horario: value.horario && value?.horario?.hora ? value.horario.hora : null,
      outras_informacoes: value.outras_informacoes || ''
    });
  }

  onClose() {
    this.ref.close(false);
  }
}
