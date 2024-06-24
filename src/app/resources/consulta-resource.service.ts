import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CommonUrl, getHeaders} from "./common-url";

@Injectable({
  providedIn: 'root'
})
export class ConsultaResourceService {

  commonUrl = CommonUrl + '/consultas';


  constructor(private http: HttpClient) { }
  search(search?: any): Observable<any[]> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of([]);}
    search = search ? search : {};
    return this.http.post<any[]>(`${this.commonUrl}_search`, search, getHeaders());
  }

  create(consulta: any): Observable<any>{
    let token: string;

    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.post<any>(this.commonUrl, consulta,getHeaders());
  }

  get(id: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.get<any>(`${this.commonUrl}/${id}`, getHeaders());
  }

  update(consulta: any, id: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.put<any>(`${this.commonUrl}/${id}`, consulta, getHeaders());
  }

  delete(id: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {
      return of({});
    }

    return this.http.delete<any>(`${this.commonUrl}/${id}`, getHeaders());
  }


}
