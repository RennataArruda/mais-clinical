import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {MedicoResourceService} from "../../../resources/medico-resource.service";
import {MatPaginator} from "@angular/material/paginator";
import {finalize} from "rxjs/operators";
import {ConsultaResourceService} from "../../../resources/consulta-resource.service";

@Component({
  selector: 'app-search-consulta-dialog',
  templateUrl: './search-consulta-dialog.component.html',
  styleUrls: ['./search-consulta-dialog.component.scss'],
})
export class SearchConsultaDialogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;

  dataPagination: any;
  result: any[] = [];
  totalRecords: number = 0;
  loading : boolean = false;
  constructor(
    private resource: ConsultaResourceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SearchConsultaDialogComponent>,
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
