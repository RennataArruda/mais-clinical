import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {CommonUrl} from "./common-url";

@Injectable({
  providedIn: 'root'
})
export class AuthResourceService {

  commonUrl = CommonUrl + '/auth';

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
