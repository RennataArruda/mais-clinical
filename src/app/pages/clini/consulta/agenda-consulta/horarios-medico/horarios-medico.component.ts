import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {DataHorario} from "./data-horario";
import {ToastrService} from "ngx-toastr";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'horarios-medico',
  templateUrl: './horarios-medico.component.html',
  styleUrls: ['./horarios-medico.component.scss']
})
export class HorariosMedicoComponent implements OnInit {
  horarios = [
    {
      hora: '08:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '08:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '09:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '09:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '10:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '10:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '11:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '13:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '14:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '14:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '15:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '15:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '16:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '16:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '17:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '17:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '18:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '18:30',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '19:00',
      disponivel: true,
      selecionado: false
    },
    {
      hora: '19:30',
      disponivel: true,
      selecionado: false
    }
  ]
  ;


  horariosMedico$: Subject<string[]> = new Subject<string[]>();

  @Output()
  horarioSelecionado: EventEmitter<any> = new EventEmitter<any>();
  constructor(private alerta: ToastrService) {
  }

  ngOnInit() {
    this.horariosMedico$.subscribe(horarios => {
      this.horarios.forEach(h => {
        h.disponivel = true;
        h.selecionado = false;
      });
      if (horarios && horarios.length > 0) {
        horarios.forEach(h => {
          const horario = this.horarios.find(hh => hh.hora === h);
          if (horario) {
            horario.disponivel = false;
            horario.selecionado = false;
          }
        });
      }
    });
  }

  selecionarHorario(horario: any) {
    const subHorario = this.horarios.filter(h => h.hora !== horario.hora);
    if (!horario.disponivel && !horario.selecionado) {
      this.alerta.error('Horário indisponível', 'Opa!');
      return;
    } else if (subHorario.filter(h => h.selecionado).length > 0) {
      subHorario.forEach(h => {
        h.disponivel = true;
        h.selecionado = false;
      });
    }

    horario.disponivel = !horario.disponivel;
    horario.selecionado = !horario.selecionado;
    if (!!horario.selecionado)
      this.horarioSelecionado.emit(horario);
    else
      this.horarioSelecionado.emit(null);
  }

  @Input()
  set horariosMedico(value: string[]) {
    this.horariosMedico$.next(value);
  }

  @Input()
  set valuePreview(value: any) {
    if (!value) return;
    const horario = this.horarios.find(h => h.hora === value.hora);
    if (horario) {
      horario.disponivel = false;
      horario.selecionado = true;
    }
  }

}
