import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import {Router} from "@angular/router"
import { LoginServiceService } from '../Services/login-service.service';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DropdownModule,
    SplitButtonModule,
    MenubarModule,
    ButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private loginService: LoginServiceService,
              private router: Router) { }

  @Output() abrirCarritoOutput = new EventEmitter<void>();
  opciones = [
    {
      label: 'Cerrar sesión',
      command: () => {
        this.cerrarSesion();
      }
    },
  ]
  items = [
      {label: 'Inicio', icon: 'pi pi-home', routerLink: ['./']},
      {label: 'Productos',
        items: [
          {label: 'Discos duros',  routerLink: ['./disco-duro']},
          {label: 'Memorias ram',  routerLink: ['./ram']},
          {label: 'Perifericos',  routerLink: ['./periferico']},
          {label: 'cables',  routerLink: ['./cables']},
        ]
      },
      {label: 'Gestion',
        items: [
          {label: 'Ventas',  routerLink: ['./gestion-ventas']},
          {label: 'Recepción',  routerLink: ['./gestion-recepcion']},
          {label: 'Estadisticas',  routerLink: ['./estadisticas-ventas']},
        ]},
    ];

    aLogin(){
      this.loginService.checkLogin().subscribe({
        next: (res: any) => {
            this.router.navigate(['/perfil'])
        },
        error: (err: any) => {
          this.router.navigate(['/'])
        }
      });
    }

    cerrarSesion(){
      this.loginService.cerrarSesion().subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/'])
        },
        error: (err: any) => {
        }
      });
    }

    abrirCarrito(){
      this.abrirCarritoOutput.emit();
    }
}
