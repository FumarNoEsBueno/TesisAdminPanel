import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';
import { ComprasService } from '../Services/compras.service';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Producto } from '../Classes/Producto';

@Component({
  selector: 'app-estadisticas-ventas',
  standalone: true,
  imports: [CardModule,
    InputSwitchModule,
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
  parametroTiempo: string = "mes";
  porPrecio: boolean = false;
  frecuanciaAcumulada: boolean = false;

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

    /*
    TODO:
      En los metodos donde se genera la data, cada vez que se calcula cualquier cosa,
    vease calcular calcularProductosPorSiempre(), o similares, se recorre el arreglo
    entero de ventas para sacar los productos. Para optimizar esto, podemos recorrerlo
    una unica vez, y de ahi crear un arreglo de la clase Productos, y quitarnos de
    encima un ciclo for permanentemente.

    TODO:
      Añadir eventualmente volumen y peso como parametro de calculo.
    */
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
    }

    if(this.frecuanciaAcumulada)
      data = this.frecuenciaAcumulada(data);

    this.calcularData(labels, data);
  }

  frecuenciaAcumulada(data: any[]) {
    data.forEach((d: any) => {
      for(let i = 0; i < d.data.length - 1; i++){
        d.data[i + 1] += d.data[i];
      }
    });

    return data;
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
      case "precio":
      break;
      case "usuario":
        let usuarios = this.getNombresUnicosDeUsuarios();
        usuarios.forEach((x: any) => {
          response = response.concat(this.calcularUsuariosPorSiempre(x));
        });
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
      case "precio":
      break;
      case "usuario":
        let usuarios = this.getNombresUnicosDeUsuarios();
        usuarios.forEach((x: any) => {
          response = response.concat(this.calcularUsuariosPorAno(x));
        });
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
                  response += this.addValue(venta.discos);
              break;
              case "Mouse":
                venta.perifericos.forEach((periferico: any) => {
                  if(periferico.tipo != "Mouse") return;
                  response += this.addValueIndividual(periferico);
                });
              break;
              case "Teclado":
                venta.perifericos.forEach((periferico: any) => {
                  if(periferico.tipo != "Teclado") return;
                  response += this.addValueIndividual(periferico);
                });
              break;
              case "Microfono":
                venta.perifericos.forEach((periferico: any) => {
                  if(periferico.tipo != "Microfono") return;
                  response += this.addValueIndividual(periferico);
                });
              break;
              case "Cables":
                venta.cables.forEach((cable: any) => {
                  response += this.addValueCable(cable);
              });
              break;
              case "Ram":
                response += this.addValue(venta.rams);
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
    let contador: any = [0,0,0,0,0,0,0,0,0,0,0,0];
    let anoActual;
    if(this.parametroTiempo == "mes"){
        anoActual = new Date().getFullYear();
      }else{
        anoActual = new Date(this.mesSeleccionado).getFullYear();
      }
    this.ventas.forEach((venta: any) => {
      const fecha = new Date(venta.created_at);
      const mes = fecha.getMonth();
      const anoObjeto = fecha.getFullYear();

      if(anoObjeto != anoActual) return;
      switch (tipoProducto){
        case "Discos duros":
            contador[mes] += this.addValue(venta.discos);
          break;
        case "Mouse":
          venta.perifericos.forEach((periferico: any) => {
            if(periferico.tipo != "Mouse") return;
            contador[mes] += this.addValueIndividual(venta.perifericos);
          }); break;
        case "Teclado":
          venta.perifericos.forEach((periferico: any) => {
            if(periferico.tipo != "Teclado") return;
            contador[mes] += this.addValueIndividual(venta.perifericos);
          }); break;
        case "Microfono":
          venta.perifericos.forEach((periferico: any) => {
            if(periferico.tipo != "Microfono") return;
            contador[mes] += this.addValueIndividual(venta.perifericos);
          }); break;
        case "Cables":
          venta.cables.forEach((cable: any) => {
            contador[mes] += this.addValueCable(cable);
        });
            break;
          case "Ram":
            contador[mes] += this.addValue(venta.rams);
          break;
      }
    });

    return {
      type: 'bar',
      label: tipoProducto,
      data: contador
    };
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
          if(disco.marca_id == marcaProducto.id)response+= this.addValueIndividual(disco);
        });
        venta.perifericos.forEach((periferico: any) => {
          if(periferico.marca_id == marcaProducto.id)response += this.addValueIndividual(periferico);
        });
        venta.rams.forEach((ram: any) => {
          if(ram.marca_id == marcaProducto.id) response += this.addValueIndividual(ram);
        });
        venta.cables.forEach((cable: any) => {
          if(cable.marca_id == marcaProducto.id) response += this.addValueCable(cable);
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
    let contador: any = [0,0,0,0,0,0,0,0,0,0,0,0];
    let anoActual;
    if(this.parametroTiempo == "mes"){
        anoActual = new Date().getFullYear();
      }else{
        anoActual = new Date(this.mesSeleccionado).getFullYear();
      }
    this.ventas.forEach((venta: any) => {
      const fecha = new Date(venta.created_at);
      const mes = fecha.getMonth();
      const anoObjeto = fecha.getFullYear();

      if(anoObjeto != anoActual) return;
        venta.discos.forEach((disco: any) => {
          if(disco.marca_id == marcaProducto.id) contador[mes] += this.addValueIndividual(disco);
        });
        venta.perifericos.forEach((periferico: any) => {
          if(periferico.marca_id == marcaProducto.id)contador[mes] += this.addValueIndividual(periferico);
        });
        venta.rams.forEach((ram: any) => {
          if(ram.marca_id == marcaProducto.id) contador[mes] += this.addValueIndividual(ram);
        });
        venta.cables.forEach((cable: any) => {
          if(cable.marca_id == marcaProducto.id) contador[mes] += this.addValueCable(cable);
        });

    });

    return {
      type: 'bar',
      label: marcaProducto.marca_nombre,
      data: contador
    };
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

  calcularUsuariosPorSiempre(usuario: String){

    const fechasUnicas = [...new Set(this.ventas.map((obj: any) => new Date(obj.created_at).getFullYear()))]
    .sort((a: any, b: any) => a - b);

    const contador = fechasUnicas.map(fechaUnica => {
      let response = 0;
      this.ventas.forEach((venta: any) =>{
        const fecha = new Date(venta.created_at);
        const anoObjeto = fecha.getFullYear();

        if(anoObjeto != fechaUnica)return;
        if(venta.usuario.name == usuario){
          response += this.addValue(venta.discos);
          response += this.addValue(venta.perifericos);
          response += this.addValue(venta.rams);
          venta.cables.forEach((cable: any) => {
            response += this.addValueCable(cable);
          });
        }
      });
      return response;
    });

    return {
      type: 'bar',
      label: usuario,
      data: contador
    };
  }

  calcularUsuariosPorAno(usuario: String){
    let contador: any = [0,0,0,0,0,0,0,0,0,0,0,0];
    let anoActual;
    if(this.parametroTiempo == "mes"){
        anoActual = new Date().getFullYear();
      }else{
        anoActual = new Date(this.mesSeleccionado).getFullYear();
      }

      this.ventas.forEach((venta: any) => {
        const fecha = new Date(venta.created_at);
        const anoObjeto = fecha.getFullYear();

        if(anoObjeto != anoActual) return;
        if(venta.usuario.name != usuario) return;
        contador[fecha.getMonth()] += this.addValue(venta.discos);
        contador[fecha.getMonth()] += this.addValue(venta.perifericos);
        contador[fecha.getMonth()] += this.addValue(venta.rams);
        venta.cables.forEach((cable: any) => {
          contador[fecha.getMonth()] += this.addValueCable(cable);
        });
      });

    return {
      type: 'bar',
      label: usuario,
      data: contador
    };
  }

  addValue(value: any){
    if(this.porPrecio){
      let response = 0;
      value.forEach((v: any) => {
        let producto = new Producto(v);
        response += producto.precio;
      });
      return response;
    }else{
      return value.length;
    }
  }

  addValueIndividual(value: any){
    if(this.porPrecio){
      let producto = new Producto(value);
      let response = producto.precio;
      return response;
    }else{
      return 1;
    }
  }

  addValueCable(value: any){
    if(this.porPrecio){
      let response = 0;
      value.forEach((v: any) => {
        let producto = new Producto(v);
        response += producto.precio * producto.cantidad;
      });
      return response;
    }else{
      return value.pivot.compra_cable_cantidad;
    }
  }

}
