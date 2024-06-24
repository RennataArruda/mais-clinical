import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {CommonUrl, getHeaders} from "./common-url";

@Injectable({
  providedIn: 'root'
})
export class AuthResourceService {

  commonUrl = CommonUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  login(data: any){
    return this.http.post<any>(this.commonUrl + '/session', data);
  }

  getUser(){
    const token = sessionStorage.getItem('token') ?? '';
    if (!token) return of(null);
    return this.http.get<any>(CommonUrl + '/me', getHeaders());
  }
}
