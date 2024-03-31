import {SideNavInterface} from "../../interfaces/side.nav.interface";

export const navData: SideNavInterface[] = [
  {
    icon: 'home',
    name: 'Home',
    position: 1
  },
  {
    icon: 'manage_accounts',
    name: 'Usuário',
    position: 2,
    viewOnlyRoot: true
  },
  {
    icon: 'account_circle',
    name: 'Paciente',
    position: 3,
    viewOnlyRoot: true
  }
];


