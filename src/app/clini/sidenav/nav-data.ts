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
    icon: 'personal_injury',
    name: 'Paciente',
    position: 3,
    viewOnlyRoot: true
  }
];


