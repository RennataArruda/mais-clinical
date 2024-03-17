import {Component, Inject, OnInit} from "@angular/core";
import {UsuarioResourceService} from "../../../resources/usuario-resource.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements OnInit {
  inputdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  onClose() {
    this.ref.close(false);
  }

  onConfirm() {
    this.ref.close(true);
  }

}
