import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CommonUrl} from "./common-url";

@Injectable({
  providedIn: 'root'
})
export class ConsultaResourceService {

  commonUrl = CommonUrl + '/consultas';


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

  create(consulta: any): Observable<any>{
    let token: string;

    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.post<any>(this.commonUrl, consulta,{
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  get(id: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.get<any>(`${this.commonUrl}/${id}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  update(consulta: any, id: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.patch<any>(`${this.commonUrl}/${id}`, consulta, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  delete(id: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {
      return of({});
    }

    return this.http.delete<any>(`${this.commonUrl}/${id}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }


}
