import {Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import { MedicoResourceService } from 'src/app/resources/medico-resource.service';
import {MatTableDataSource} from "@angular/material/table";
import {AddEditMedicoComponent} from "./add-edit-medico/add-edit-medico.component";
import {first} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss'],
})
export class MedicoComponent {

  result: any[] = [];

  dataPagination: any;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;

  totalRecords: number = 0;
  pageSize: number = 5;
  pageEvent: any;

  displayedColumns: string[] = [ "codigo", "cpf_cnpj", "nome_medico", "visualizar", "editar"];

  constructor(private resource: MedicoResourceService,
              private attAuth: AuthService,
              private toastr: ToastrService,
              private dialog: MatDialog,
  ) {
  }


  ngOnInit() {
    this.attAuth.validarUsuario();
    this.search();
  }

  ngOnDestroy() {}

  openModal(code: any, title: any,component:any, view?: boolean) {
    var _popup = this.dialog.open(component, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
        view: view,
      }
    });

    _popup.afterClosed().subscribe(item => {
      console.log(item)
      this.search();
    })
  }


  onView(item: any) {
    this.openModal(item, 'Visualizar Médico', AddEditMedicoComponent, true);
  }

  getData(){
    return this.result;
  }

  onAdd(){
    this.openModal({}, 'Adicionar Medico', AddEditMedicoComponent);
  }

  onEdit(item: any){
    this.openModal(item, 'Editar Medico',  AddEditMedicoComponent);
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

  search(){
    this.resource.search().subscribe(response => {
      // Exibe o objeto retornado no console
      console.log(response);

      this.result = response.sort((a, b) => a.id - b.id);
      this.dataPagination = new MatTableDataSource(this.getData());
      this.totalRecords = this.dataPagination.data.length;
      this.dataPagination.paginator = this.paginator;
    }, error => {
      this.toastr.error(error, 'Opa!');
      console.log(this.getData())
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataPagination.filter = filterValue.trim().toLowerCase();

    if (this.dataPagination.paginator) {
      this.dataPagination.paginator.firstPage();
    }
  }
  }
