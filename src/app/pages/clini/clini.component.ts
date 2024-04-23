import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {CliniModules} from "./clini.modules";


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-clini',
  templateUrl: './clini.component.html',
  imports: [CliniModules],
  standalone: true,
  styleUrls: ['./clini.component.scss'],
})
export class CliniComponent implements OnInit {

  pegeActive: number = 1;

  isRoot: boolean = false;

  constructor(private attAuth: AuthService) {
  }

  ngOnInit() {
    const user: any = this.attAuth.currentUser ? JSON.parse(this.attAuth.currentUser) : null;
    if (!user) {
      this.attAuth.logout();
    } else {
      this.isRoot = user.root;
    }
  }

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  showPage(page: number): void {
    this.pegeActive = page;
  }
}
