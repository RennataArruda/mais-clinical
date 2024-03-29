import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthResourceService} from "../resources/auth-resource.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MaterialModule} from "../material.module";
import {first} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import {CommonModule} from "@angular/common";
import {FlexModule} from "@angular/flex-layout/flex";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [MatCardModule, MaterialModule, FlexModule, CommonModule],
  standalone: true,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private builder: FormBuilder,
              private toastr: ToastrService,
              private attAuth: AuthService,
              private authResource: AuthResourceService,
              private router: Router) {
  }

  invalidForm: boolean = false;
  form: FormGroup = this.builder.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required])]
  });

  ngOnInit() {
    sessionStorage.clear();
    this.attAuth.validarUsuario();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.error('Existem campos inválidos', 'Opa!');
      this.invalidForm = true;

      setTimeout(() => {this.invalidForm = false}, 2000);
    } else {
      this.authResource.login(this.form.value).pipe(first()).subscribe(res => {
        if (res){
          sessionStorage.setItem('token', res.authToken);

          this.authResource.getUser().pipe().subscribe(response => {
            if (!response.ativo){
              this.toastr.error('Usuário Inativo', 'Opa!');
              this.router.navigateByUrl('/login');
              return;
            } else {
              this.attAuth.setCurrentUser(JSON.stringify(response));
              this.router.navigateByUrl('/clini');
            }

          }, error => {
            this.toastr.error('Erro ao iniciar sessão', 'Opa!');
            this.router.navigateByUrl('/login');
          });
        }
      }, error => {
        this.toastr.error('Credenciais Inválidas', 'Opa!');
      });
    }
  }
}
