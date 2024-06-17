import { Component } from '@angular/core';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';
import { ComprasService } from '../Services/compras.service';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-estadisticas-ventas',
  standalone: true,
  imports: [CardModule,
    FormsModule,
    RadioButtonModule,
    ChartModule],
  templateUrl: './estadisticas-ventas.component.html',
  styleUrl: './estadisticas-ventas.component.css'
})
export class EstadisticasVentasComponent {

  ventas: any;

  saltarComprasNoTerminadas: boolean = true;

  cantidadDiscos: any;
  cantidadPerifericos: any;
  cantidadRam: any;

  parametroCalculo: string = "producto";
  subParametroCalculo: string = "ninguno";

  dataUsuario: any;
  optionsUsuario: any;
  data: any;
  options: any;
  tiposPerifericos: any;
  parametroTiempo: any;

  constructor(private loginService: LoginServiceService,
              private router: Router,
              private comprasService: ComprasService){}

  ngOnInit(){
    this.loginService.checkLogin().subscribe({
      error: () => {
        this.router.navigate(['/'])
      },
      complete: () => {
        this.getData();
      }
    });
  }

  getData(){
    this.getVentas();
  }

  calcularData(labels: any, data: any){

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  getVentas(){
    this.comprasService.getTipoPeriferico().subscribe({
      next: (res: any) => {
        this.tiposPerifericos = res.map((r: any) => r.id);
      }
    });
    this.comprasService.getVentasParaEstadisticas().subscribe({
      next: (res: any) => {
        this.ventas = res;
        let productos = this.calcularProductos();
        let cantidadPorProductos = this.calcularCantidadPorProductos();
        this.calcularData(productos, cantidadPorProductos);
      },
    });
  }

  calcularProductosDiferenciados(){
    return ['Discos duros',
      'Ram',
      'Mouse',
      'Teclado',
      'Cable',
      'Audifonos',
      'Microfono'];
  }

  calcularProductos(){
    return ['Discos duros', 'Perifericos', 'Ram'];
  }

  calcularCantidadPorProductosDiferenciados(listaProductos: any){
    const cantidadDeVentasPorProducto = new Array(listaProductos.length).fill(0);

    this.ventas.forEach((venta: any) => {
      cantidadDeVentasPorProducto[0] += venta.discos.length;
      cantidadDeVentasPorProducto[1] += venta.rams.length;
      venta.perifericos.forEach((periferico: any) => {
        let posicion = this.tiposPerifericos.indexOf(periferico.tipo_periferico_id);
        cantidadDeVentasPorProducto[posicion + 2] += 1;
      });
    });

    return cantidadDeVentasPorProducto;
  }

  calcularCantidadPorProductos(){
    let contadorDiscos = 0;
    let contadorPerifericos = 0;
    let contadorRam = 0;

    this.ventas.forEach((venta: any) => {
      contadorDiscos += venta.discos.length;
      contadorPerifericos += venta.perifericos.length;
      contadorRam += venta.rams.length;
    });

    return [contadorDiscos, contadorPerifericos, contadorPerifericos];
  }

  calculateComprasPorUsuario(){
    let listaUsuarios = this.getNombresUnicosDeUsuarios();
    let cantidadDeVentasPorUsuario = this.getComprasPorUsuario(listaUsuarios);
    this.calcularData(listaUsuarios, cantidadDeVentasPorUsuario);
  }

  getNombresUnicosDeUsuarios() {
    let nombresUnicos: any = [];
    this.ventas.forEach((venta: any) => {
        if (!nombresUnicos.includes(venta.usuario.name)) {
            nombresUnicos.push(venta.usuario.name);
        }
    });

    return nombresUnicos;
  }

  getComprasPorUsuario(listaNombres: any){
    const cantidadVentaPorUsuario = new Array(listaNombres.length).fill(0);
    this.ventas.forEach((venta: any) => {
      let posicion = listaNombres.indexOf(venta.usuario.name)
      cantidadVentaPorUsuario[posicion] += venta.discos.length + venta.rams.length + venta.discos.length;
    });

    return cantidadVentaPorUsuario;
  }

  calcularPorProducto(){
    let productos, cantidadPorProductos;
    switch(this.subParametroCalculo){
      case ("diferenciar"):
        productos = this.calcularProductosDiferenciados();
        cantidadPorProductos = this.calcularCantidadPorProductosDiferenciados(productos);
        break;

      default:
        productos = this.calcularProductos();
        cantidadPorProductos = this.calcularCantidadPorProductos();
        break;
    }
    this.calcularData(productos, cantidadPorProductos);
  }

  calcularPorMarca(){
    this.comprasService.getMarcas().subscribe({
      next: (res: any) => {
        let marcas = res.map((marca: any) => marca.marca_nombre);
        let marcasId = res.map((marca: any) => marca.id);
        let cantidadPorMarcas = this.getCantidadPorMarcas(marcasId);
        this.calcularData(marcas, cantidadPorMarcas);
      },
    });
  }

  calcularPorPrecio(){
    let precios = ["< 10k",
      "10k - 20k",
      "20k - 30k",
      "30k - 40k",
      "40k - 50k",
      "50k - 60k",
      "60k - 70k",
      "70k - 80k",
      "80k - 90k",
      "90k - 100k",
      "> 100k",
    ];
    let cantidadPorPrecio = this.calcularCantodadPorPrecio(precios);
    this.calcularData(precios,
      cantidadPorPrecio);
  }

  calcularCantodadPorPrecio(listaPrecios: any){
    const cantidadPorPrecio = new Array(listaPrecios.length).fill(0);

    this.ventas.forEach((venta: any) => {
      venta.discos.forEach((disco: any) => {
        for(let i = 1; i <= 10; i++){
          if(disco.disco_duro_precio < 10000*i){
            cantidadPorPrecio[i-1] += 1;
            break;
          }
          if(i == 10) cantidadPorPrecio[i] += 1;
        }
      });
      venta.perifericos.forEach((periferico: any) => {
        for(let i = 1; i < 10; i++){
          if(periferico.periferico_precio < 10000*i){
            cantidadPorPrecio[i-1] += 1;
            break;
          }
          if(i == 10) cantidadPorPrecio[i] += 1;
        }
      });
      venta.rams.forEach((ram: any) => {
        for(let i = 1; i < 10; i++){
          if(ram.ram_precio < 10000*i){
            cantidadPorPrecio[i-1] += 1;
            break;
          }
          if(i == 10) cantidadPorPrecio[i] += 1;
        }
      });
    });

    return cantidadPorPrecio;
  }

  getCantidadPorMarcas(listaMarcas: any){
    const cantidadDeVentasPorMarca = new Array(listaMarcas.length).fill(0);
    this.ventas.forEach((venta: any) => {
      venta.discos.forEach((disco: any) => {
        let posicion = listaMarcas.indexOf(disco.marca_id);
        cantidadDeVentasPorMarca[posicion] += 1;
      });
      venta.perifericos.forEach((periferico: any) => {
        let posicion = listaMarcas.indexOf(periferico.marca_id);
        cantidadDeVentasPorMarca[posicion] += 1;
      });
      venta.rams.forEach((ram: any) => {
        let posicion = listaMarcas.indexOf(ram.marca_id);
        cantidadDeVentasPorMarca[posicion] += 1;
      });
    });

    return cantidadDeVentasPorMarca;
  }
}
