import { Routes } from '@angular/router';
import { MostradorDiscoDuroComponent } from './mostrador-disco-duro/mostrador-disco-duro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MostradorRamComponent } from './mostrador-ram/mostrador-ram.component';
import { MostradorPerifericoComponent } from './mostrador-periferico/mostrador-periferico.component';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { GestionComprasComponent } from './Componentes/gestion-compras/gestion-compras.component';
import { EstadisticasVentasComponent } from './estadisticas-ventas/estadisticas-ventas.component';

export const routes: Routes = [{
  path: 'home',
  component: HomePageComponent,
  title: 'MidTech: Low cost'
},{
  path: 'ram',
  component: MostradorRamComponent,
  title: 'MidTech: Rams'
},{
  path: 'periferico',
  component: MostradorPerifericoComponent,
  title: 'MidTech: Perifericos'
},{
  path: 'disco-duro',
  component: MostradorDiscoDuroComponent,
  title: 'MidTech: Discos duros'
},{
  path: '',
  component: LoginComponent,
  title: 'MidTech: login'
},{
  path: 'gestion-ventas',
  component: GestionComprasComponent,
  title: 'MidTech: gestion ventas'
},{
  path: 'estadisticas-ventas',
  component: EstadisticasVentasComponent,
  title: 'MidTech: estadisticas ventas'
},{
  path: 'recover',
  component: RecoverComponent,
  title: 'MidTech: recover'
},
];
