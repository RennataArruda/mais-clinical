import {Component, Input, OnInit} from "@angular/core";
import {ConvenioResourceService} from "../../resources/convenio-resource.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'select-convenio',
  template: `
    <mat-form-field color="primary" class="w-100">
      <mat-label class="color-primary">{{label}}</mat-label>
      <mat-select [compareWith]="compare" [(value)]="value" (selectionChange)="attValue($event)">
        <mat-option *ngFor="let item of data" [value]="item">{{item.convenio}}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [``],
})
export class SelectConvenioComponent implements OnInit {

  data: any[] = [];

  value: any;

  @Input()
  label: string = '';


  @Input()
    // @ts-ignore
  form: FormGroup;

  @Input()
  property: string = '';

  constructor(private service: ConvenioResourceService) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(data => {
      this.data = data;
    });
  }

  attValue(event: any) {
    this.form.get(this.property)?.setValue(event.value);
    this.form.get(this.property)?.updateValueAndValidity();
  }

  @Input()
  set inputValue (value: any) {
    if (value)
      this.value = value;
  }

  compare(c1: any, c2: any) {
    return c1 && c2 && c1.id === c2.id;
  }

}
