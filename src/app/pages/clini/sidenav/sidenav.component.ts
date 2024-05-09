import {navData} from "./nav-data";
import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {AuthService} from "../../../services/auth/auth.service";
import {AlterarSenhaComponent} from "../usuario/alterar-senha/alterar-senha.component";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  collapsed = false;
  screenWidth = 0;
  navData = navData;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @Output() onSelectMenuItem: EventEmitter<number> = new EventEmitter();

  @Input()
  userRoot: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  constructor(private auth: AuthService,
              private toastr: ToastrService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  alterarSenha(){
    const usuario = JSON.parse(this.auth.currentUser as string);
    this.openModal(usuario, 'Alterar Senha Usuário', AlterarSenhaComponent);
  }

  openModal(code: any, title: any,component:any, view?: boolean) {
    var _popup = this.dialog.open(component, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
        view: view
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.logout();
    })
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  selectMenuItem(position?: number): void {
    if (!position) return;

    this.onSelectMenuItem.emit(position);
  }

  logout(){
    this.auth.logout();
  }

}
