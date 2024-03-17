import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {AuthResourceService} from "./resources/auth-resource.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mais-clinical';

  constructor(private auth: AuthService,
              private http: HttpClient,
              private router: Router,
              private authResource: AuthResourceService){
    inject(AuthService);
    inject(HttpClient)
  }

  ngOnInit(): void {
    this.auth.validarUsuario();
  }
}
