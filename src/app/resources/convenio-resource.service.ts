import {Injectable} from "@angular/core";
import {CommonUrl} from "./common-url";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConvenioResourceService {

  commonUrl = CommonUrl + '/convenio';


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    let token: string;
    // @ts-ignore

    token = sessionStorage.getItem('token') ?? '';
    if (!token) {
      return of([]);
    }
    return this.http.get<any[]>(`${this.commonUrl}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }
}
