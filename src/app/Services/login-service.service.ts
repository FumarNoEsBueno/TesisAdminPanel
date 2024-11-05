import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  url: string = "http://127.0.0.1:8000/api/";

  constructor(
    private http:HttpClient
  ) { }

  crearUsuarioNuevo(body: any){
    const token = this.getToken();
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'create_user', body, { headers });
  }

  login(credentials: any){
    return this.http.post(this.url + 'admin_login', credentials);
  }

  checkLogin(){
    const token = this.getToken();
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'check_admin_login',null , { headers });
  }

  getToken(){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    return token;
  }

  cerrarSesion(){
    const token = this.getToken();
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'revoke_token',null , { headers });
  }

  cambiarContraseña(nuevaContraseña: any, contraseñaActual: any){
    let token = this.getToken();
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'update_password', {actual:contraseñaActual,contrasena_nueva: nuevaContraseña}, { headers });
  }
}
