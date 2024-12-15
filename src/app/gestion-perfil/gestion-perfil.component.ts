import { LoginServiceService } from '../Services/login-service.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-gestion-perfil',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './gestion-perfil.component.html',
  styleUrl: './gestion-perfil.component.css'
})
export class GestionPerfilComponent {

  constructor(private loginService: LoginServiceService,
              private router: Router) { }

  contrasenaActual = "";
  contrasenaNueva = "";
  contrasenaNuevaRepetir = "";

  nombreUsuario = "";
  correoUsuario = "";
  numeroUsuario = "";

  privilegies: any;

  ngOnInit(){
    this.loginService.checkLogin().subscribe({
      next: (res: any) => {
        this.privilegies = res.admin_privilegies;
      }
    });
  }

  cambiarContrasena(){
    this.loginService.cambiarContraseña(this.contrasenaNueva, this.contrasenaActual).subscribe({
      next: (res) => {
        this.contrasenaNueva = "";
        this.contrasenaNuevaRepetir = "";
        this.contrasenaActual = "";
      },
      error: (err) => {
      }
    });
  }

  crearUsuarioNuevo(){
    let body = {
      name: this.nombreUsuario,
      number: this.numeroUsuario,
      email: this.correoUsuario
    }

    this.loginService.crearUsuarioNuevo(body).subscribe({
      next: (res) => {
        this.nombreUsuario = "";
        this.numeroUsuario = "";
        this.correoUsuario = "";
      },
      error: (err) => {
      }
    });
  }

}
