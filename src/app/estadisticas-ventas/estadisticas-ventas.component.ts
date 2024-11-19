import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
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
    CalendarModule,
    FormsModule,
    RadioButtonModule,
    ChartModule],
  templateUrl: './estadisticas-ventas.component.html',
  styleUrl: './estadisticas-ventas.component.css'
})
export class EstadisticasVentasComponent {

  ventas: any;
  mesSeleccionado: any;

  cantidadDiscos: any;
  cantidadPerifericos: any;
  cantidadRam: any;

  parametroCalculo: string = "producto";
  subParametroCalculo: string = "ninguno";

  parametroTiempo: string = "mes";

  dataUsuario: any;
  optionsUsuario: any;
  data: any;
  options: any;
  tiposPerifericos: any;
  marcas: any;

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

  generarEstadisticas(){

    let labels: any = [];
    let data: any = [];

    switch(this.parametroTiempo){

      case "ano":
        labels = [...new Set(this.ventas.map((obj: any) => new Date(obj.created_at).getFullYear()))]
          .sort((a: any, b: any) => a - b);
        data = this.generarDataPorSiempre();
      break;

      case "mes":
      case "selectAno":
        labels = ["Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"];
        data = this.generarDataPorAno();
      break;

      case "semana":
        labels = ["1",
          "2",
          "3",
          "4"];
        data = this.generarDataPorSemana();
      break;
    }

    this.calcularData(labels, data);
  }

  generarDataPorSiempre(){
    let response: any = [];
    switch(this.parametroCalculo){
      case "producto":
        this.getProductos().forEach((x) => {
          response = response.concat(this.calcularProductosPorSiempre(x));
        });
      break;
      case "marca":
        this.marcas.forEach((x: any) => {
          response = response.concat(this.calcularMarcaPorSiempre(x));
        });
      break;
      case "usuario":
      break;
    }

    return response;
  }

  generarDataPorAno(){
    let response: any = [];
    switch(this.parametroCalculo){
      case "producto":
        this.getProductos().forEach((x) => {
          response = response.concat(this.calcularProductosPorAno(x));
        });
      break;
      case "marca":
        this.marcas.forEach((x: any) => {
          response = response.concat(this.calcularMarcaPorAno(x));
        });
      break;
      case "usuario":
      break;
    }

    return response;
  }

  generarDataPorSemana(){
  }

  getData(){
    this.getVentas();
    this.getTipoPeriferico();
    this.getMarcas();
  }

  calcularData(labels: any, data: any){

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: labels,
      datasets: data
    };

    this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                    },
                    grid: {
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                    },
                    grid: {
                        drawBorder: false
                    }
                }
            }
        };
  }

  getVentas(){
    this.comprasService.getVentasParaEstadisticas().subscribe({
      next: (res: any) => {
        this.ventas = res;
        this.generarEstadisticas();
      },
    });
  }

  getTipoPeriferico(){
    this.comprasService.getTipoPeriferico().subscribe({
      next: (res: any) => {
        this.tiposPerifericos = res;
      }
    });
  }

  getMarcas(){
    this.comprasService.getMarcas().subscribe({
      next: (res: any) => {
        this.marcas = res;
      }
    });
  }

  getProductos(){
    return ['Discos duros',
      'Ram',
      'Cables',
      'Mouse',
      'Teclado',
      'Audifonos',
      'Microfono'];
  }

  calcularProductosPorSiempre(tipoProducto: String){
    const fechasUnicas = [...new Set(this.ventas.map((obj: any) => new Date(obj.created_at).getFullYear()))]
      .sort((a: any, b: any) => a - b);

      const contador = fechasUnicas.map(fechaUnica => {
         let response = 0;
         this.ventas.forEach((venta: any) =>{
          const fecha = new Date(venta.created_at);
          const anoObjeto = fecha.getFullYear();

          if(anoObjeto != fechaUnica)return;
          switch (tipoProducto){
            case "Discos duros":
                response += venta.discos.length;
              break;
              case "Mouse":
                venta.perifericos.forEach((periferico: any) => {
                  if(periferico.tipo != "Mouse") return;
                  response++;
                });
              break;
              case "Teclado":
                venta.perifericos.forEach((periferico: any) => {
                  if(periferico.tipo != "Teclado") return;
                  response++;
                });
              break;
              case "Microfono":
                venta.perifericos.forEach((periferico: any) => {
                  if(periferico.tipo != "Microfono") return;
                  response++;
                });
              break;
              case "Cables":
                venta.cables.forEach((cable: any) => {
                  response += cable.pivot.compra_cable_cantidad;
              });
              break;
              case "Ram":
                response += venta.rams.length;
              break;
          }
        }
        );
        return response;
      });

      return {
        type: 'bar',
        label: tipoProducto,
        data: contador
      };
  }

  calcularProductosPorAno(tipoProducto: String){
    let contador: any = [];
    let anoActual;
    if(this.parametroTiempo == "mes"){
        anoActual = new Date().getFullYear();
      }else{
        anoActual = new Date(this.mesSeleccionado).getFullYear();
      }
    this.ventas.forEach((venta: any) => {
      const fecha = new Date(venta.created_at);
      const mes = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      const anoObjeto = fecha.getFullYear();

      if(anoObjeto != anoActual) return;
      switch (tipoProducto){
        case "Discos duros":
          if(contador[mes]) {
            contador[mes] += venta.discos.length;
          } else {
            contador[mes] = venta.discos.length;
          } break;
        case "Mouse":
          venta.perifericos.forEach((periferico: any) => {
          if(periferico.tipo != "Mouse") return;
          if(contador[mes]) {
            contador[mes]++;
          } else {
            contador[mes] = 1;
          }
        }); break;
        case "Teclado":
          if(contador[mes]) {
            contador[mes]+=venta.perifericos.length;
          } else {
            contador[mes]+=venta.perifericos.length;
          } break;
        case "Microfono":
          if(contador[mes]) {
            contador[mes]+=venta.perifericos.length;
          } else {
            contador[mes]+=venta.perifericos.length;
          } break;
        case "Cables":
          venta.cables.forEach((cable: any) => {
          if(contador[mes]) {
            contador[mes] += cable.pivot.compra_cable_cantidad;
          } else {
            contador[mes] = cable.pivot.compra_cable_cantidad;
          }
        });
            break;
          case "Ram":
          if(contador[mes]) {
            contador[mes] += venta.rams.length;
          } else {
            contador[mes] = venta.rams.length;
          } break;
      }
    });

    const resultado = [];
    for (let mes = 1; mes <= 12; mes++) {
        const mesFormateado = `${anoActual}-${mes.toString().padStart(2, '0')}`;
        resultado.push(contador[mesFormateado] || 0)
    }

    return {
      type: 'bar',
      label: tipoProducto,
      data: resultado
    };
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
      venta.cables.forEach((cable: any) => {
        cantidadVentaPorUsuario[posicion] += cable.pivot.compra_cable_cantidad;
      });
    });

    return cantidadVentaPorUsuario;
  }

  calcularMarcaPorSiempre(marcaProducto: any){

    const fechasUnicas = [...new Set(this.ventas.map((obj: any) => new Date(obj.created_at).getFullYear()))]
    .sort((a: any, b: any) => a - b);

    const contador = fechasUnicas.map(fechaUnica => {
      let response = 0;
      this.ventas.forEach((venta: any) =>{
        const fecha = new Date(venta.created_at);
        const anoObjeto = fecha.getFullYear();

        if(anoObjeto != fechaUnica)return;
        venta.discos.forEach((disco: any) => {
          if(disco.marca_id == marcaProducto.id)response++;
        });
        venta.perifericos.forEach((periferico: any) => {
          if(periferico.marca_id == marcaProducto.id)response++;
        });
        venta.rams.forEach((ram: any) => {
          if(ram.marca_id == marcaProducto.id) response++;
        });
        venta.cables.forEach((cable: any) => {
          if(cable.marca_id == marcaProducto.id) response += cable.pivot.compra_cable_cantidad;
        });
      });
      return response;
    });

    return {
      type: 'bar',
      label: marcaProducto.marca_nombre,
      data: contador
    };
  }

  calcularMarcaPorAno(marcaProducto: any){
    let contador: any = [];
    let anoActual;
    if(this.parametroTiempo == "mes"){
        anoActual = new Date().getFullYear();
      }else{
        anoActual = new Date(this.mesSeleccionado).getFullYear();
      }
    this.ventas.forEach((venta: any) => {
      const fecha = new Date(venta.created_at);
      const mes = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      const anoObjeto = fecha.getFullYear();

      let response = 0;
      if(anoObjeto != anoActual) return;
        venta.discos.forEach((disco: any) => {
          if(disco.marca_id == marcaProducto.id){
            if(contador[mes]) {
              contador[mes] ++;
            } else {
              contador[mes] = 1;
            }
          }
        });
        venta.perifericos.forEach((periferico: any) => {
          if(periferico.marca_id == marcaProducto.id)response++;
        });
        venta.rams.forEach((ram: any) => {
          if(ram.marca_id == marcaProducto.id) response++;
        });
        venta.cables.forEach((cable: any) => {
          if(cable.marca_id == marcaProducto.id) response += cable.pivot.compra_cable_cantidad;
        });
        return response;
    });

    const resultado = [];
    for (let mes = 1; mes <= 12; mes++) {
        const mesFormateado = `${anoActual}-${mes.toString().padStart(2, '0')}`;
        resultado.push(contador[mesFormateado] || 0)
    }

    return {
      type: 'bar',
      label: marcaProducto.marca_nombre,
      data: resultado
    };
  }
}
