import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicoResourceService {

  commonUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:WwQP6b4e/medico';

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

  create(medico: any): Observable<any>{
    let token: string;

    // @ts-ignore
    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.post<any>(this.commonUrl, medico,{
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  get(idMedico: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.get<any>(`${this.commonUrl}/${idMedico}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  update(medico: any, idMedico: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of({});}
    return this.http.patch<any>(`${this.commonUrl}/${idMedico}`, medico, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  delete(idMedico: number): Observable<any> {
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) {
      return of({});
    }

    return this.http.delete<any>(`${this.commonUrl}/${idMedico}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }


}

