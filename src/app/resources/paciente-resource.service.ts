import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PacienteResourceService {

  commonUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:WwQP6b4e/paciente';


  constructor(private http: HttpClient) { }
  search(): Observable<any[]> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of([]);}
    return this.http.get<any[]>(`${this.commonUrl}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  create(paciente: any): Observable<any>{
    let token: string;

    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.post<any>(this.commonUrl, paciente,{
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  get(idPaciente: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.get<any>(`${this.commonUrl}/${idPaciente}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  ativarOrNot(paciente: any, idPaciente: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.put<any>(`${this.commonUrl}/${idPaciente}/inativar-ativar`, paciente, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  update(paciente: any, idPaciente: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.patch<any>(`${this.commonUrl}/${idPaciente}`, paciente, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

}
