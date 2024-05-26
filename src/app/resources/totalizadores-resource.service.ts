import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class TotalizadoresResourceService {

  commonUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:WwQP6b4e/totalizadores';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }


  totalClientes(): Observable<number> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of(0);}
    return this.http.post<number>(`${this.commonUrl}/clientes`, {},{
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  totalPrestadores(): Observable<number> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of(0);}
    return this.http.post<number>(`${this.commonUrl}/prestadores`, {}, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  totalConsultasDia(): Observable<number> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of(0);}
    const dataSearch = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.http.post<number>(`${this.commonUrl}/consultas_hoje`, {data_atual: dataSearch}, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }

  consultasCanceladas(): Observable<number> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {return of(0);}

    return this.http.post<number>(`${this.commonUrl}/consultas_canceladas`, {}, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }
}

