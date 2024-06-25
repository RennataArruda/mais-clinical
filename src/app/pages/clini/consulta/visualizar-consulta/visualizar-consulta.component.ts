import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {ConsultaResourceService} from "../../../../resources/consulta-resource.service";
import {EditarConsultaComponent} from "../editar-consulta/editar-consulta.component";
import {TransformData} from "../../../../services/utils/transform-data";

@Component({
  selector: 'app-visualizar-consulta',
  templateUrl: './visualizar-consulta.component.html',
  styleUrls: ['./visualizar-consulta.component.scss'],
  providers: [DatePipe]
})
export class VisualizarConsultaComponent implements OnInit, OnDestroy {

  inputdata: any;
  editdata: any;
  clean: number = 0;
  private transform: TransformData = new TransformData();
  constructor(private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<EditarConsultaComponent>, private builder: FormBuilder,
              private resource: ConsultaResourceService,
              private datePipe: DatePipe) {
  }

  form = this.builder.group({
    id: this.builder.control(null),
    data_consulta: this.builder.control('', Validators.required),
    horario: this.builder.control('', Validators.required),
    outras_informacoes: this.builder.control(''),
    paciente_id: this.builder.control(null),
    paciente: this.builder.control(null, Validators.required),
    medico_id: this.builder.control(null),
    medico: this.builder.control(null, Validators.required)
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
      this.form.get('horario')?.setValue(this.editdata.horario);
      this.form.get('outras_informacoes')?.setValue(this.editdata.outras_informacoes);
      this.form.get('paciente_id')?.setValue(this.editdata.paciente_id);
      this.form.get('paciente')?.setValue(this.editdata?.paciente?.nome_completo);
      this.form.get('medico_id')?.setValue(this.editdata.medico_id);
      this.form.get('medico')?.setValue(this.editdata?.medico?.nome);
      this.form.get('horario')?.disable();
      this.form.get('data_consulta')?.disable();
      this.form.get('medico')?.disable();
      this.form.get('paciente')?.disable();
      this.form.get('outras_informacoes')?.disable();

      if (!!this.editdata.data_consulta){
        const dataConsulta = this.transform.transformData(this.editdata.data_consulta);
        this.form.get('data_consulta')?.setValue(dataConsulta);
      }

    });
  }

  ngOnDestroy() {
  }

  private transformModal(value: any){
    return {
      id: value.id,
      paciente_id: value.paciente_id,
      medico_id: value.medico_id,
      data_consulta: this.datePipe.transform(this.form.get('data_consulta')?.value, 'yyyy-MM-dd'),
      horario: value.horario && value?.horario?.hora ? value.horario.hora : null,
      outras_informacoes: value.outras_informacoes || ''
    };
  }

  onClose() {
    this.ref.close(false);
  }
}
