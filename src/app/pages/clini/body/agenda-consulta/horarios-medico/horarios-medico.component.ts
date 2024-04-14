import {Component, EventEmitter, Output} from "@angular/core";
import {DataHorario} from "./data-horario";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'horarios-medico',
  templateUrl: './horarios-medico.component.html',
  styleUrls: ['./horarios-medico.component.scss']
})
export class HorariosMedicoComponent {
  horarios = DataHorario;

  @Output()
  horarioSelecionado: EventEmitter<any> = new EventEmitter<any>();
  constructor(private alerta: ToastrService) {
  }

  selecionarHorario(horario: any) {
    const subHorario = this.horarios.filter(h => h.hora !== horario.hora);
    if (subHorario.filter(h => h.selecionado).length > 0) {
      this.alerta.error('Já existe um horário selecionado ', 'Opa!');
      return;
    } else if (!horario.disponivel && !horario.selecionado) {
      this.alerta.error('Horário indisponível', 'Opa!');
      return;
    }
    horario.disponivel = !horario.disponivel;
    horario.selecionado = !horario.selecionado;
    if (!!horario.selecionado)
      this.horarioSelecionado.emit(horario);
    else
      this.horarioSelecionado.emit(null);

    console.log(this.horarios);
  }

}
