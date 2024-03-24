import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class UsuarioResourceService {

  commonUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:WwQP6b4e/usuarios';

  constructor(private http: HttpClient) {}

  create(usuario: any): Observable<any>{
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.post<any>(this.commonUrl, usuario,{
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  update(usuario: any, idUsuario: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.patch<any>(`${this.commonUrl}/${idUsuario}`, usuario, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  alterarSenha(usuario: any, idUsuario: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.put<any>(`${this.commonUrl}/${idUsuario}/alterar-senha`, usuario, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  ativarOrNot(usuario: any, idUsuario: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.put<any>(`${this.commonUrl}/${idUsuario}/inativar-ativar`, usuario, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  get(idUsuario: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.get<any>(`${this.commonUrl}/${idUsuario}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  search(): Observable<any[]> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of([]);}
    return this.http.get<any[]>(`${this.commonUrl}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

}
