import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WatchSubscription} from "../../../../services/utils/watcher";
import {ConsultasMedicoService} from "../../../../resources/consultas-medico.service";
import {DatePipe} from "@angular/common";
import {first} from "rxjs";


@Component({
  selector: 'app-agendar-consulta',
  templateUrl: './agendar-consulta.component.html',
  styleUrls: ['./agendar-consulta.component.scss'],
  providers: [DatePipe]
})
export class AgendarConsultaComponent implements OnInit, OnDestroy {

  horarioSelecionado: any;
  invalidForm: boolean = false;
  inputdata: any;
  editdata: any;

  hasMedicoEData: boolean = false;

  horariosMedico: string[] = [];

  private watcher$: WatchSubscription = WatchSubscription.createInstance();


  constructor(private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<AgendarConsultaComponent>, private builder: FormBuilder,
              private service: ConsultasMedicoService,
              private datePipe: DatePipe) {
  }

  form = this.builder.group({
    id: this.builder.control(null),
    data_consulta: this.builder.control(new Date(), Validators.required),
    horario: this.builder.control('', Validators.required),
    outras_informacoes: this.builder.control(''),
    paciente_id: this.builder.control(null),
    paciente: this.builder.control(null, Validators.required),
    medico_id: this.builder.control(null),
    medico: this.builder.control(null, Validators.required)
  });

  ngOnInit() {
    this.makeWatchers();
  }

  ngOnDestroy() {
    this.watcher$.destroy();
  }

  private makeWatchers(){
    const medico: AbstractControl = this.form.get('medico') as AbstractControl;
    const data: AbstractControl = this.form.get('data_consulta') as AbstractControl;

    this.watcher$.watch(medico.valueChanges, value => {
      console.log('medico', value);
      if(value && value.id && data.value){
        this.hasMedicoEData = true;
        this.searchHorariosMedico(value.id, data.value);
      }
    })

  }

  private searchHorariosMedico(idMedico: number, data: Date){
    const dataFormatada = this.datePipe.transform(data, 'yyyy-MM-dd');
    const search = Object.assign({}, {
      medico_id: idMedico,
      data_consulta: dataFormatada
    })
    this.service.search(search).pipe(first()).subscribe(
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
  }

  onSubmit(value: any) {
    if (!this.validateForm(value)){
      this.invalidForm = true;
      setTimeout(() => {this.invalidForm = false}, 2000);
    } else {
      const model = this.transformModal(value);
      console.log('model', model);
    }
  }

  private transformModal(value: any){
    return Object.assign({}, value, {
      paciente_id: value.paciente && value.paciente.id ? value.paciente.id : null,
      medico_id: value.medico && value.medico.id ? value.medico.id : null,
      data_consulta: this.datePipe.transform(value.data_consulta, 'yyyy-MM-dd')
    });
  }

  private validateForm(value: any){
    if (this.form.invalid){
      this.toastr.error('Existem campos inválidos', 'Opa!');
      return false;
    } else if (!value.paciente.id){
      this.toastr.error('Selecione um paciente', 'Opa!');
      return false;
    } else if (!value.medico.id){
      this.toastr.error('Selecione um médico', 'Opa!');
      return false;
    }
    return true;
  }

  onClose() {
    this.ref.close(false);
  }
}
