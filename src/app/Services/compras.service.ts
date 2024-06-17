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

  getEstados(){
    return this.http.get(this.url + 'parametros/estado');
  }

  getPerifericos(){
    return this.http.get(this.url + 'perifericos');
  }

  getVentasParaEstadisticas(){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.get(this.url + 'get_ventas_para_estadisticas', { headers });
  }

  getCompras(){
    let token = localStorage.getItem( 'MidTechAdminToken' );
    const headers = new HttpHeaders().set("Authorization","Bearer " + token);
    return this.http.post(this.url + 'get_all_compras', null, { headers });
  }

  getDiscosDuros(page:any, disponibilidad: string[], estado: string[], tamano: string[], marca: string[], sistemaArchivos: string[]){
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
    sistemaArchivos.forEach((e: String) => {
      url = url + '&sistema_archivos[]='+e;
    });
    return this.http.get(url);
  }
}
