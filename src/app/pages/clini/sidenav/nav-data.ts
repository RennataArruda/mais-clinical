import {SideNavInterface} from "../../../interfaces/side.nav.interface";

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
    viewOnlyRoot: true //Campo Indicando se será visivel apenas para o root/administrador
  },
  {
    icon: 'personal_injury',
    name: 'Paciente',
    position: 3,
    viewOnlyRoot: false
  },
  {
    icon: 'medical_services',
    name: 'Médicos',
    position: 4,
    viewOnlyRoot: false
  }
];



