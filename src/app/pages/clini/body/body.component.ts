import {Component, Input, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {TotalizadoresResourceService} from "../../../resources/totalizadores-resource.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  consultasDia = 0;
  consultasCanceladas = 0;
  prestadores = 0; // Nova propriedade para consultas canceladas
  pacientesCadastrados = 0;
  constructor(private dialog: MatDialog,
              private totalizadoresService: TotalizadoresResourceService) {
  }

  ngOnInit() {
    this.totalizadoresService.totalConsultasDia().subscribe((response) => {
      if (!!response)
        this.consultasDia = response.totalConsultasHoje;
    });

    // Chamada para obter o total de consultas canceladas
    this.totalizadoresService.consultasCanceladas().subscribe((response) => {
      if (!!response)
        this.consultasCanceladas = response.totalConsultasCanceladas;
    });

    this.totalizadoresService.totalPrestadores().subscribe((response) => {
      if (!!response)
        this.prestadores = response.totalMedicos;
    });

     this.totalizadoresService.totalClientes().subscribe((response) => {
       if (!!response)
        this.pacientesCadastrados = response.totalPacientes;
    });


  }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}
