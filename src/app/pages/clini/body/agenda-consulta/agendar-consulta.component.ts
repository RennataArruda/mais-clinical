import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-agendar-consulta',
  templateUrl: './agendar-consulta.component.html',
  styleUrls: ['./agendar-consulta.component.scss']
})
export class AgendarConsultaComponent implements OnInit {

  horarioSelecionado: any;

  constructor() {
  }

  ngOnInit() {
  }

  atualizarHorarioSelecionado(horario: any) {
      this.horarioSelecionado = horario;
  }
}
