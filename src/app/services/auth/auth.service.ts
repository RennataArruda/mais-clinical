import {Injectable, signal} from "@angular/core";
import {UserInterface} from "../../interfaces/user.interface";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthResourceService} from "../../resources/auth-resource.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<UserInterface | undefined | null>(undefined);

  constructor(private authResource: AuthResourceService,
              private router: Router) {
  }

  setCurrentUser(user: string) {
    sessionStorage.setItem('user', user);
  }

  get currentUser() {
    return sessionStorage.getItem('user');
  }

  validarUsuario(){
    const rota = this.router.url === '/usuarios/session';
    if (rota) {
        this.withOutUser();
        return;
    }
    this.authResource.getUser().pipe().subscribe(response => {
      if (response) {
        sessionStorage.setItem('user', JSON.stringify(response));
        this.router.navigateByUrl('/clini');

      } else {
        this.withOutUser();
      }
    }, error => {
      this.withOutUser();
    });
  }

  private withOutUser() {
    sessionStorage.setItem('user', '');
    this.router.navigateByUrl('/login');
  }

  logout() {
    localStorage.setItem('token', '');
    sessionStorage.setItem('user', '');
    this.router.navigateByUrl('/login');
  }
}
