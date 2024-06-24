import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CommonUrl, getHeaders} from "./common-url";

@Injectable({providedIn: 'root'})
export class UsuarioResourceService {

  commonUrl =  CommonUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  create(usuario: any): Observable<any>{
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.post<any>(this.commonUrl + '/autenticado', usuario,getHeaders());
  }

  update(usuario: any, idUsuario: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.put<any>(`${this.commonUrl}/${idUsuario}`, usuario, getHeaders());
  }

  alterarSenha(usuario: any, idUsuario: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.put<any>(`${this.commonUrl}/newPassword/${idUsuario}`, usuario, getHeaders());
  }

  ativarOrNot(usuario: any, idUsuario: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.put<any>(`${this.commonUrl}/${idUsuario}/toggle`, usuario, getHeaders());
  }

  get(idUsuario: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.get<any>(`${this.commonUrl}/${idUsuario}`, getHeaders());
  }

  search(): Observable<any[]> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of([]);}
    return this.http.get<any[]>(`${this.commonUrl}`, getHeaders());
  }

}
