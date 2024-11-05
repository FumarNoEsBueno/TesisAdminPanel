import { Routes } from '@angular/router';
import { MostradorDiscoDuroComponent } from './mostrador-disco-duro/mostrador-disco-duro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MostradorRamComponent } from './mostrador-ram/mostrador-ram.component';
import { MostradorPerifericoComponent } from './mostrador-periferico/mostrador-periferico.component';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { GestionComprasComponent } from './Componentes/gestion-compras/gestion-compras.component';
import { EstadisticasVentasComponent } from './estadisticas-ventas/estadisticas-ventas.component';
import { GestionRecepcionComponent } from './gestion-recepcion/gestion-recepcion.component';
import { MostradorCablesComponent } from './mostrador-cables/mostrador-cables.component';
import { GestionPerfilComponent } from './gestion-perfil/gestion-perfil.component';

export const routes: Routes = [{
  path: 'home',
  component: HomePageComponent,
  title: 'Biobío Reciclajes'
},{
  path: 'ram',
  component: MostradorRamComponent,
  title: 'Biobío Reciclajes: Rams'
},{
  path: 'periferico',
  component: MostradorPerifericoComponent,
  title: 'Biobío Reciclajes: Perifericos'
},{
  path: 'cables',
  component: MostradorCablesComponent,
  title: 'Biobío Reciclajes: Cables'
},{
  path: 'disco-duro',
  component: MostradorDiscoDuroComponent,
  title: 'Biobío Reciclajes: Discos duros'
},{
  path: '',
  component: LoginComponent,
  title: 'Biobío Reciclajes: login'
},{
  path: 'gestion-ventas',
  component: GestionComprasComponent,
  title: 'Biobío Reciclajes: gestion ventas'
},{
  path: 'gestion-recepcion',
  component: GestionRecepcionComponent,
  title: 'Biobío Reciclajes: gestion recepción'
},{
  path: 'estadisticas-ventas',
  component: EstadisticasVentasComponent,
  title: 'Biobío Reciclajes: estadisticas ventas'
},{
  path: 'perfil',
  component: GestionPerfilComponent,
  title: 'Biobío Reciclajes: profile'
},{
  path: 'recover',
  component: RecoverComponent,
  title: 'Biobío Reciclajes: recover'
},
];
