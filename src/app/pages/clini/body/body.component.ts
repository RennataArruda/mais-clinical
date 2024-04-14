import {Component, Input} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {AddEditUsuarioComponent} from "../usuario/add-edit-usuario/add-edit-usuario.component";
import {AgendarConsultaComponent} from "./agenda-consulta/agendar-consulta.component";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor(private dialog: MatDialog) {
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

  openModal( title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '100%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
      }
    });
    _popup.afterClosed().subscribe(item => {})
  }

  open(){
    this.openModal( 'Marcar Consulta', AgendarConsultaComponent);
  }
}
