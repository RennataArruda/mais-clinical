import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {MedicoResourceService} from "../../../resources/medico-resource.service";
import {MatPaginator} from "@angular/material/paginator";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-search-paciente-dialog',
  templateUrl: './search-paciente-dialog.component.html',
  styleUrls: ['./search-paciente-dialog.component.scss']
})
export class SearchPacienteDialogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;

  dataPagination: any;
  result: any[] = [];
  totalRecords: number = 0;
  loading : boolean = false;
  constructor(
    private resource: MedicoResourceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SearchPacienteDialogComponent>,
    private builder: FormBuilder) {
  }

  ngOnInit() {
    this.loading = true;
    this.resource.search().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(response => {
      this.dataPagination = response.sort((a, b) => a.id - b.id);
      this.totalRecords = response.length;
      this.dataPagination.paginator = this.paginator;
    }, error => {
      this.toastr.error(error, 'Opa!');
    });
  }

  onSelectItem(item: any) {
    this.ref.close(item);
  }

  onClose() {
    this.ref.close(false);
  }
}
