import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WatchSubscription} from "../../../../services/utils/watcher";
import {ConsultasMedicoService} from "../../../../resources/consultas-medico.service";
import {DatePipe} from "@angular/common";
import {first} from "rxjs";
import {finalize} from "rxjs/operators";
import * as moment from "moment";
import {ConsultaResourceService} from "../../../../resources/consulta-resource.service";


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
  dataSearch: any;
  searchButton: boolean = false;
  hasMedicoEData: boolean = false;

  horariosMedico: string[] = [];
  clean: number = 0;

  private watcher$: WatchSubscription = WatchSubscription.createInstance();


  constructor(private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<AgendarConsultaComponent>, private builder: FormBuilder,
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
      if(value && value.id && data.value){
        this.searchButton = true;
        this.hasMedicoEData = false;
      }

      if(!value || !value.id){
        this.limparCampos();
      }
    });

    this.watcher$.watch(data.valueChanges, value => {
      if(value && medico.value && medico.value.id){
        this.hasMedicoEData = false;
        this.searchButton = true;
      }
      if (!value){
        this.limparCampos();
      }
    })

  }

  public searchHorariosMedico(){
    const data = this.form.get('data_consulta')?.value;
    // @ts-ignore
    const idMedico = this.form.get('medico')?.value?.id;

    if (!data || !idMedico)
      return;

    if (!this.validarDataPesquisa(data))
      return;

    this.dataSearch = this.datePipe.transform(data, 'yyyy-MM-dd');
    const search = Object.assign({}, {
      medico_id: idMedico,
      data_consulta: this.dataSearch
    })
    this.service.search(search).pipe(first(), finalize(() => {
      this.hasMedicoEData = true;
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

  private validarDataPesquisa(data: string){
    const parts = data.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Mês começa em 0 no objeto Date
    const day = parseInt(parts[2]);
    const date = new Date(year, month, day);
    const dataAtual = new Date().setHours(0, 0, 0, 0);
    if (moment(date).isBefore(dataAtual)){
      this.toastr.error('Para criar um consulta a data deve ser maior ou igual a data atual', 'Opa!');
      return false;
    }
    return true;
  }

  private limparCampos(){
    this.hasMedicoEData = false;
    this.horariosMedico = [];
    const horario = this.form.get('horario');
    horario?.setValue('');
    horario?.updateValueAndValidity();
  }

  atualizarHorarioSelecionado(horario: any) {
      this.horarioSelecionado = horario;
      const horarioControl = this.form.get('horario');
      horarioControl?.setValue(horario);
      horarioControl?.updateValueAndValidity();
  }

  onSubmit() {
    const value = this.form.value;
    if (!this.validateForm(value)){
      this.invalidForm = true;
      setTimeout(() => {this.invalidForm = false}, 2000);
    } else {
      const model = this.transformModal(value);
      this.resource.create(model).pipe(first()).subscribe(response => {
        if (response){
          this.toastr.success('Consulta cadastrado com sucesso', 'Sucesso!');
          this.ref.close(model);
        }
      }, error => {
        console.log('error', error);
      });
    }
  }

  private transformModal(value: any){
    return Object.assign({}, value, {
      paciente_id: value.paciente && value.paciente.id ? value.paciente.id : null,
      medico_id: value.medico && value.medico.id ? value.medico.id : null,
      data_consulta: this.datePipe.transform(value.data_consulta, 'yyyy-MM-dd'),
      horario: value.horario && value?.horario?.hora ? value.horario.hora : null
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
