import {CommonUrl} from "./common-url";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConsultasMedicoService {
  commonUrl = CommonUrl + '/consultas-medico';

  constructor(private http: HttpClient) { }

  search(search: any): Observable<any[]> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of([]);}
    return this.http.post<any[]>(`${this.commonUrl}`,  search,{
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }
}
