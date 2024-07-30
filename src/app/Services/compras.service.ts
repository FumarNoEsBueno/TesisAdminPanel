import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../Classes/Producto';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  url: string = "http://127.0.0.1:8000/api/";

  constructor(
    private http:HttpClient
  ) { }


  getTipoPeriferico(){
    return this.http.get(this.url + 'parametros/tipo_periferico');
  }

  getDescuentos(){
    return this.http.get(this.url + 'get_descuentos');
  }

  getTipoEntrada(){
    return this.http.get(this.url + 'parametros/tipo_entrada');
  }

  getEstadoCompra(){
    return this.http.get(this.url + 'parametros/estado_compra');
  }

  getDisponibilidad(){
    return this.http.get(this.url + 'parametros/disponibilidad');
  }

  getSistemaArchivos(){
    return this.http.get(this.url + 'parametros/sistema-archivos');
  }

  getTamano(){
    return this.http.get(this.url + 'parametros/tamano');
  }

  getMarcas(){
    return this.http.get(this.url + 'parametros/marca');
  }

  updateEstadoCompra(estado: any, compraId: any){
    let body = {
      compraId: compraId,
      estadoId: estado.id
    };
    let token = localStorage.getItem( 'MidTechAdminToken' );
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'update_estado_compra', body, { headers });
  }

  updateProducto(producto: Producto){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'set_producto' ,producto ,{ headers });
  }

  revisarCompra(codigo: any){
    return this.http.get(this.url + 'compras?codigo=' + codigo);
  }

  getEstadosRecepcion(){
    return this.http.get(this.url + 'parametros/estado_recepcion');
  }

  getEstados(){
    return this.http.get(this.url + 'parametros/estado');
  }

  getCapacidadRam(){
    return this.http.get(this.url + 'parametros/capacidad_ram');
  }

  getTipoRam(){
    return this.http.get(this.url + 'parametros/tipo_ram');
  }

  getVelocidadRam(){
    return this.http.get(this.url + 'parametros/velocidad_ram');
  }

  getTamanoRam(){
    return this.http.get(this.url + 'parametros/tamano_ram');
  }

  confirmarRecepcion(recepcionId: any){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    let body = {
      id: recepcionId
    }
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'confirmar_recepcion', body , { headers });
  }

  cancelarRecepcion(recepcionId: any){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    let body = {
      id: recepcionId
    }
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'cancelar_recepcion',body , { headers });
  }

  getVentasParaEstadisticas(){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.get(this.url + 'get_ventas_para_estadisticas', { headers });
  }

  getRecepciones(page: number){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'get_all_recepciones',{page: page}, { headers });
  }

  getCompras(page: any){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'get_all_compras', {page: page}, { headers });
  }

  getCables(page:any,
          estado: string[],
          marca: string[],
          tipoEntrada: string[],
          precio: number[],){

    let url = this.url + 'get_all_cable?page='+page;

    estado.forEach((e: String) => {
      url = url + '&estado[]='+e;
    });
    marca.forEach((e: String) => {
      url = url + '&marca[]='+e;
    });
    tipoEntrada.forEach((e: String) => {
      url = url + '&tipoEntrada[]='+e;
    });
    precio.forEach((e: number) => {
      url = url + '&precio[]='+e;
    });

    return this.http.get(url);
  }

  getPerifericos(page:any,
          estado: string[],
          marca: string[],
          tipoEntrada: string[],
          tipoPeriferico: string[],
          precio: number[],){
    let url = this.url + 'get_all_perifericos?page='+page;

    estado.forEach((e: String) => {
      url = url + '&estado[]='+e;
    });
    marca.forEach((e: String) => {
      url = url + '&marca[]='+e;
    });
    tipoEntrada.forEach((e: String) => {
      url = url + '&tipoEntrada[]='+e;
    });
    tipoPeriferico.forEach((e: String) => {
      url = url + '&tipoPeriferico[]='+e;
    });
    precio.forEach((e: number) => {
      url = url + '&precio[]='+e;
    });

    return this.http.get(url);
  }

  getRams(page:any,
          estado: string[],
          marca: string[],
          capacidad: string[],
          tipo: string[],
          velocidad: string[],
          tamano: string[],
          precio: number[],
          ){

    let url = this.url + 'get_all_ram?page='+page;

    estado.forEach((e: String) => {
      url = url + '&estado[]='+e;
    });
    marca.forEach((e: String) => {
      url = url + '&marca[]='+e;
    });
    capacidad.forEach((e: String) => {
      url = url + '&capacidad[]='+e;
    });
    tipo.forEach((e: String) => {
      url = url + '&tipo[]='+e;
    });
    velocidad.forEach((e: String) => {
      url = url + '&velocidad[]='+e;
    });
    tamano.forEach((e: String) => {
      url = url + '&tamano[]='+e;
    });
    precio.forEach((e: number) => {
      url = url + '&precio[]='+e;
    });

    return this.http.get(url);
  }

  getDiscosDuros(page:any,
                 disponibilidad: string[],
                 estado: string[],
                 tamano: string[],
                 marca: string[],
                 precio: number[],
                 capacidad: number[],
                 esperanza: number[],
                 horas: number[],
                 sistemaArchivos: string[]){

    let url = this.url + 'get_all_discos_duros?page='+page;

    disponibilidad.forEach((e: String) => {
      url = url + '&disponibilidad[]='+e;
    });
    estado.forEach((e: String) => {
      url = url + '&estado[]='+e;
    });
    tamano.forEach((e: String) => {
      url = url + '&tamano[]='+e;
    });
    marca.forEach((e: String) => {
      url = url + '&marca[]='+e;
    });
    precio.forEach((e: number) => {
      url = url + '&precio[]='+e;
    });
    capacidad.forEach((e: number) => {
      url = url + '&capacidad[]='+e;
    });
    esperanza.forEach((e: number) => {
      url = url + '&esperanza[]='+e;
    });
    horas.forEach((e: number) => {
      url = url + '&horas[]='+e;
    });
    sistemaArchivos.forEach((e: String) => {
      url = url + '&sistema_archivos[]='+e;
    });
    return this.http.get(url);
  }

}
