import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { DatePipe } from "@angular/common";
import {CommonUrl, getHeaders} from "./common-url";

@Injectable({
  providedIn: 'root',
})
export class TotalizadoresResourceService {

  commonUrl =  CommonUrl + '/totalizadores';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  totalClientes(): Observable<any> {
    let token: string;
    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) { return of(0); }
    return this.http.get<any>(`${this.commonUrl}/pacientes`, getHeaders());
  }

  totalPrestadores(): Observable<any> {
    let token: string;
    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) { return of(0); }
    return this.http.get<any>(`${this.commonUrl}/medicos`, getHeaders());
  }

  totalConsultasDia(): Observable<any> {
    let token: string;
    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) { return of(0); }
    const dataSearch = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.http.get<any>(`${this.commonUrl}/consultas/hoje`, getHeaders());
  }

  consultasCanceladas(): Observable<any> {
    let token: string;
    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) { return of(0); }
    return this.http.get<any>(`${this.commonUrl}/consultas/canceladas`, getHeaders());
  }
}
