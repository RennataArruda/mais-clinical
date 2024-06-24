import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CommonUrl, getHeaders} from "./common-url";

@Injectable({
  providedIn: 'root'
})
export class PacienteResourceService {

  commonUrl = CommonUrl + '/pacientes';


  constructor(private http: HttpClient) { }
  search(): Observable<any[]> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of([]);}
    return this.http.get<any[]>(`${this.commonUrl}`, getHeaders());
  }

  create(paciente: any): Observable<any>{
    let token: string;

    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.post<any>(this.commonUrl, paciente,getHeaders());
  }

  get(idPaciente: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.get<any>(`${this.commonUrl}/${idPaciente}`, getHeaders());
  }

  update(paciente: any, idPaciente: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.put<any>(`${this.commonUrl}/${idPaciente}`, paciente, getHeaders());
  }

}
