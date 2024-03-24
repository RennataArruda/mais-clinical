import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthResourceService {

  commonUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:WwQP6b4e/auth';

  constructor(private http: HttpClient) {}

  login(data: any){
    return this.http.post<any>(this.commonUrl + '/login', data);
  }

  getUser(){
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) return of(null);
    return this.http.get<any>(this.commonUrl + '/me', {
      headers: {
        Authorization: token ? `${token}` : '',
      }
    });
  }
}
