import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ComprasService } from '../Services/compras.service';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insertar-producto',
  standalone: true,
  imports: [
    FileUploadModule,
    ToastModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DropdownModule
  ],
  providers: [MessageService],
  templateUrl: './insertar-producto.component.html',
  styleUrl: './insertar-producto.component.css'
})
export class InsertarProductoComponent {

  producto = [
    "Disco duro",
    "Ram",
    "Periferico",
    "Cable",
  ];
  selectedProducto: any;

  lotes: any;
  selectedlote: any;

  productoId: any;
  discos: any;
  selectedDisco = {
    name: "ninguno",
    id: null
  };
  rams: any;
  selectedRam = {
    name: "ninguno",
    id: null
  };
  perifericos: any;
  selectedPeriferico = {
    name: "ninguno",
    id: null
  };
  cables: any;
  selectedCable = {
    name: "ninguno",
    id: null
  };

  marcas: any;
  disponibilidades: any;
  almacenes: any;
  estados: any;
  sistemaArchivos: any;
  tipoEntradas: any;
  tamanosDiscoDuro: any;

  //Valores generales
  marca: any;
  nombreProducto: any;
  fotoProducto: any;
  disponibilidad: any;
  almacen: any;
  estado: any;
  precio: any;
  descuento: any;
  destacado: boolean = false;

  //Valores de disco duro
  fotoCrystaldisk: any;
  horasEncendido: any;
  esperanzaDeVida: any;
  tamanoDiscoDuro: any;
  sistemaArchivo: any;
  capacidad: any;
  tipoEntradaDiscoDuro: any;

  //Valores de ram
  tiposRam: any;
  capacidadsRam: any;
  tamanosRam: any;
  velocidadesRam: any;

  ramDescripcion: any;
  tipoRam: any;
  capacidadRam: any;
  tamanoRam: any;
  velocidadRam: any;

  //Valores de periferico
  tiposPeriferico: any;
  tiposEntradaPeriferico: any;

  tipoPeriferico: any;
  tipoEntradaPeriferico: any;
  descripcionPeriferico: any;

  //Valores de cable
  cantidadCable: any;
  tipoEntradaCable: any;

  mobile: boolean = true;

  constructor(
    private loginService: LoginServiceService,
    private messageService: MessageService,
    private router: Router,
    private comprasService: ComprasService){}

  ngOnInit(){
    this.getMobile();
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

    this.reiniciarVariables();

    this.getMarcas();
    this.getDisponibilidades();
    this.getEstados();
    this.getAlmacenes();
    this.getLotes();

    switch(this.selectedProducto){
    case('Disco duro'):
      this.getDiscoDuro();
      this.getTamanoDisco();
      this.getTipoEntrada();
      this.getSistemaArchivos();
      break;
    case('Ram'):
      this.getRam();
      this.getTipoRam();
      this.getCapacidadRam();
      this.getTamanoRam();
      this.getVelocidadRam();
      break;
    case('Periferico'):
      this.getPeriferico();
      this.getTipoPeriferico();
      this.getTipoEntrada();
      break;
    case('Cable'):
      this.getCable();
      this.getTipoEntrada();
      break;
    }
  }

  reiniciarVariables(){
    this.selectedDisco = {
      name: "ninguno",
      id: null
    };
    this.selectedlote = {
      name: "NULL",
      id: null
    };
    this.capacidad = null;
    this.nombreProducto = null;
    this.fotoProducto = null;
    this.fotoCrystaldisk = null;
    this.horasEncendido = null;
    this.esperanzaDeVida = null;
    this.precio = null;
    this.disponibilidad = null;
    this.descuento = null;
    this.destacado = false;
    this.almacen = null;
    this.estado = null;
    this.tamanoDiscoDuro = null;
    this.marca = null;
    this.sistemaArchivo = null;
    this.tipoEntradaDiscoDuro = null
    this.tipoPeriferico = null;
    this.tipoEntradaPeriferico = null;
    this.descripcionPeriferico = null;
    this.ramDescripcion = null;
    this.tipoRam = null;
    this.capacidadRam = null;
    this.tamanoRam = null;
    this.velocidadRam = null;
    this.cantidadCable = null;
    this.tipoEntradaCable = null;
  }

  getMarcas(){
    if(this.marcas != null) return;
    this.comprasService.getMarcas().subscribe({
      next: (res: any) => {
        this.marcas = res;
      }
    });
  }

  getDisponibilidades(){
    if(this.disponibilidades != null) return;
    this.comprasService.getDisponibilidad().subscribe({
      next: (res: any) => {
        this.disponibilidades = res;
      }
    });
  }

  getEstados(){
    if(this.estados != null) return;
    this.comprasService.getEstados().subscribe({
      next: (res: any) => {
        this.estados = res;
      }
    });
  }

  getAlmacenes(){
    if(this.almacenes != null) return;
    this.comprasService.getAlmacenes().subscribe({
      next: (res: any) => {
        this.almacenes = res;
      }
    });
  }

  getTamanoDisco(){
    if(this.tamanosDiscoDuro != null) return;
    this.comprasService.getTamano().subscribe({
      next: (res: any) => {
        this.tamanosDiscoDuro = res;
      }
    });
  }

  getSistemaArchivos(){
    if(this.sistemaArchivos != null) return;
    this.comprasService.getSistemaArchivos().subscribe({
      next: (res: any) => {
        this.sistemaArchivos = res;
      }
    });
  }

  getTipoEntrada(){
    if(this.tipoEntradas != null) return;
    this.comprasService.getTipoEntrada().subscribe({
      next: (res: any) => {
        this.tipoEntradas = res;
      }
    });
  }

  getTipoRam(){
    if(this.tiposRam != null) return;
    this.comprasService.getTipoRam().subscribe({
      next: (res: any) => {
        this.tiposRam = res;
      }
    });
  }

  getCapacidadRam(){
    if(this.capacidadsRam != null) return;
    this.comprasService.getCapacidadRam().subscribe({
      next: (res: any) => {
        this.capacidadsRam = res;
      }
    });
  }

  getTamanoRam(){
    if(this.tamanosRam != null) return;
    this.comprasService.getTamanoRam().subscribe({
      next: (res: any) => {
        this.tamanosRam = res;
      }
    });
  }

  getVelocidadRam(){
    if(this.velocidadesRam != null) return;
    this.comprasService.getVelocidadRam().subscribe({
      next: (res: any) => {
        this.velocidadesRam = res;
      }
    });
  }

  getLotes(){
    if(this.lotes != null) return;
    this.lotes = [{
      name: "NULL",
      id: null
    }]

    this.comprasService.getLotes().subscribe({
      next: (res: any) => {
        this.lotes = this.lotes.concat(res.map((x: any) => {
          return {
            name: x.solicitud_recepcion_codigo,
            id: x.id,
          }
        }));
      }
    });
  }

  getTipoPeriferico(){
    if(this.tiposPeriferico != null) return;
    this.comprasService.getTipoPeriferico().subscribe({
      next: (res: any) => {
        this.tiposPeriferico = res;
      }
    });
  }

  agregarDiscoDuro(){

    let body = {
      id: this.selectedDisco.id,
      memoria: this.capacidad,
      nombre: this.nombreProducto,
      foto:  this.fotoProducto,
      crystaldisk: this.fotoCrystaldisk,
      horas_encendido: this.horasEncendido,
      esperanza_vida: this.esperanzaDeVida,
      precio: this.precio,
      disponibilidad: this.disponibilidad.id,
      descuento: this.descuento,
      destacado: this.destacado,
      almacen: this.almacen.id,
      estado: this.estado.id,
      tamano: this.tamanoDiscoDuro.id,
      marca: this.marca.id,
      sistema_archivos: this.sistemaArchivo.id,
      solicitud_recepcion_id: this.selectedlote.id,
      tipo_entrada: this.tipoEntradaDiscoDuro.id
    }

    if(this.selectedDisco.id != null){
      this.comprasService.modifyDiscoDuro(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Disco modificado exitosamente'});
        }
      });
    }else{
      this.comprasService.postDiscoDuro(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Disco añadido exitosamente'});
        }
      });
    }
  }

  eliminarDisco(){
    let body = {
      id: this.selectedDisco.id
    }
      this.comprasService.deleteDiscoDuro(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Disco eliminado exitosamente'});
        }
      });
  }

  eliminarRam(){
    let body = {
      id: this.selectedRam.id
    }
      this.comprasService.deleteRam(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Ram eliminada exitosamente'});
        }
      });
  }

  eliminarPeriferico(){
    let body = {
      id: this.selectedPeriferico.id
    }
      this.comprasService.deletePeriferico(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Periferico eliminado exitosamente'});
        }
      });
  }

  eliminarCable(){
    let body = {
      id: this.selectedCable.id
    }
      this.comprasService.deleteCable(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Cable eliminado exitosamente'});
        }
      });
  }

  getDiscoDuro(){
    let nullpost = [{
      name: "ninguno",
      id: null
    },]
    this.comprasService.getAllDiscoDuro().subscribe({
      next: (res: any) => {
        this.discos = nullpost.concat(res.map((r: any) => ({
          name: "(" + r.id + ") " + r.disco_duro_nombre ,
          id: r.id
        })));
      }
    });
  }

  agregarRam(){

    let body = {
        id: this.selectedRam.id,
        ram_descripcion: this.ramDescripcion,
        ram_nombre: this.nombreProducto,
        ram_foto: this.fotoProducto,
        ram_precio: this.precio,
        ram_descuento: this.descuento,
        ram_destacado: this.destacado,
        disponibilidad_id: this.disponibilidad.id,
        almacen_id: this.almacen.id,
        estado_id: this.estado.id,
        marca_id: this.marca.id,
        solicitud_recepcion_id: this.selectedlote.id,
        tipo_ram_id: this.tipoRam.id,
        capacidad_ram_id: this.capacidadRam.id,
        tamano_ram_id: this.tamanoRam.id,
        velocidad_ram_id: this.velocidadRam.id
    }

    if(this.selectedRam.id != null){
      this.comprasService.modifyRam(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Ram modificado exitosamente'});
        }
      });
    }else{
      this.comprasService.postRam(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Ram añadido exitosamente'});
        }
      });
    }
  }

  getRam(){
    let nullpost = [{
      name: "ninguno",
      id: null
    },]
    this.comprasService.getAllRam().subscribe({
      next: (res: any) => {
        this.rams = nullpost.concat(res.map((r: any) => ({
          name: "(" + r.id + ") " + r.ram_nombre ,
          id: r.id
        })));
      }
    });
  }

  agregarPerifericos(){

    let body = {
      id: this.selectedPeriferico.id,
      periferico_nombre: this.nombreProducto,
      periferico_foto: this.fotoProducto,
      periferico_descripcion: this.descripcionPeriferico,
      periferico_precio: this.precio,
      disponibilidad_id: this.disponibilidad.id,
      periferico_descuento: this.descuento,
      periferico_destacado: this.destacado,
      almacen_id: this.almacen.id,
      estado_id: this.estado.id,
      marca_id: this.marca.id,
      tipo_entrada_id: this.tipoEntradaPeriferico.id,
      solicitud_recepcion_id: this.selectedlote.id,
      tipo_periferico_id: this.tipoPeriferico.id
    }

    if(this.selectedPeriferico.id != null){
      this.comprasService.modifyPeriferico(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Periferico modificado exitosamente'});
        }
      });
    }else{
      this.comprasService.postPeriferico(body).subscribe({
        next: (res: any) => {
          this.getData();
          this.messageService.add({ severity: 'success', summary: 'Periferico añadido exitosamente'});
        }
      });
    }
  }

  getPeriferico(){
    let nullpost = [{
      name: "ninguno",
      id: null
    },]
    this.comprasService.getAllPeriferico().subscribe({
      next: (res: any) => {
        this.perifericos = nullpost.concat(res.map((r: any) => ({
          name: "(" + r.id + ") " + r.periferico_nombre ,
          id: r.id
        })));
      }
    });
  }

  agregarCable(){

    let body = {
      id: this.selectedCable.id,
      cable_nombre: this.nombreProducto,
      cable_cantidad: this.cantidadCable,
      cable_precio: this.precio,
      cable_foto: this.fotoProducto,
      cable_descuento: this.descuento,
      cable_destacado: this.destacado,
      disponibilidad_id: this.disponibilidad.id,
      solicitud_recepcion_id: this.selectedlote.id,
      almacen_id: this.almacen.id,
      estado_id: this.estado.id,
      marca_id: this.marca.id,
      tipo_entrada_id: this.tipoEntradaCable.id
    }

    if(this.selectedCable.id != null){
    this.comprasService.modifyCable(body).subscribe({
      next: (res: any) => {
        this.getData();
        this.messageService.add({ severity: 'success', summary: 'Cable modificado exitosamente'});
      }
    });
    }else{
    this.comprasService.postCable(body).subscribe({
      next: (res: any) => {
        this.getData();
        this.messageService.add({ severity: 'success', summary: 'Cable añadido exitosamente'});
      }
    });
    }
  }

  getCable(){
    let nullpost = [{
      name: "ninguno",
      id: null
    },]
    this.comprasService.getAllCable().subscribe({
      next: (res: any) => {
        this.cables = nullpost.concat(res.map((r: any) => ({
          name: "(" + r.id + ") " + r.cable_nombre ,
          id: r.id
        })));
      }
    });
  }

  elegirImagenProducto(event: any){
    this.fotoProducto = event.files[0];
  }

  elegirImagenCristaldisck(event: any){
    this.fotoCrystaldisk = event.files[0];
  }

  cargarRamPorId(){
    this.comprasService.getRam(this.selectedRam.id).subscribe({
      next: (res: any) => {
        this.productoId = res.id;
        this.nombreProducto = res.ram_nombre;
        this.precio = res.ram_precio;
        this.descuento = res.ram_descuento;
        this.destacado = res.ram_destacado;
        this.disponibilidad = this.disponibilidades.find((e: any) => e.id === res.disponibilidad_id);
        this.almacen = this.almacenes.find((e: any) => e.id === res.almacen_id);
        this.selectedlote = this.lotes.find((e: any) => e.id === res.solicitud_recepcion_id);
        this.estado = this.estados.find((e: any) => e.id === res.estado_id);
        this.marca = this.marcas.find((e: any) => e.id === res.marca_id);
        this.ramDescripcion = res.ram_descripcion;
        this.tipoRam = this.tiposRam.find((e: any) => e.id === res.tipo_ram_id);
        this.capacidadRam = this.capacidadsRam.find((e: any) => e.id === res.capacidad_ram_id);
        this.tamanoRam = this.tamanosRam.find((e: any) => e.id === res.tamano_ram_id);
        this.velocidadRam = this.velocidadesRam.find((e: any) => e.id === res.velocidad_ram_id);
      }
    });
  }

  cargarPerifericoPorId(){
    this.comprasService.getPeriferico(this.selectedPeriferico.id).subscribe({
      next: (res: any) => {
        this.productoId = res.id;
        this.nombreProducto = res.periferico_nombre;
        this.descripcionPeriferico = res.periferico_descripcion;
        this.precio = res.periferico_precio;
        this.descuento = res.periferico_descuento;
        this.destacado = res.periferico_destacado;
        this.disponibilidad = this.disponibilidades.find((e: any) => e.id === res.disponibilidad_id);
        this.almacen = this.almacenes.find((e: any) => e.id === res.almacen_id);
        this.selectedlote = this.lotes.find((e: any) => e.id === res.solicitud_recepcion_id);
        this.estado = this.estados.find((e: any) => e.id === res.estado_id);
        this.marca = this.marcas.find((e: any) => e.id === res.marca_id);
        this.tipoEntradaPeriferico = this.tipoEntradas.find((e: any) => e.id === res.tipo_entrada_id);
        this.tipoPeriferico = this.tiposPeriferico.find((e: any) => e.id === res.tipo_periferico_id);
      }
    });
  }

  cargarCablePorId(){
    this.comprasService.getCable(this.selectedCable.id).subscribe({
      next: (res: any) => {
        this.productoId = res.id;
        this.nombreProducto = res.cable_nombre;
        this.precio = res.cable_precio;
        this.descuento = res.cable_descuento;
        this.destacado = res.cable_destacado;
        this.cantidadCable = res.cable_cantidad;
        this.disponibilidad = this.disponibilidades.find((e: any) => e.id === res.disponibilidad_id);
        this.almacen = this.almacenes.find((e: any) => e.id === res.almacen_id);
        this.selectedlote = this.lotes.find((e: any) => e.id === res.solicitud_recepcion_id);
        this.estado = this.estados.find((e: any) => e.id === res.estado_id);
        this.marca = this.marcas.find((e: any) => e.id === res.marca_id);
        this.tipoEntradaCable = this.tipoEntradas.find((e: any) => e.id === res.tipo_entrada_id);
      }
    });
  }

  cargarDiscoPorId(){
    this.comprasService.getDiscoDuro(this.selectedDisco.id).subscribe({
      next: (res: any) => {
        this.productoId = res.id;
        this.capacidad = res.disco_duro_memoria;
        this.nombreProducto = res.disco_duro_nombre;
        this.horasEncendido = res.disco_duro_horas_encendido;
        this.esperanzaDeVida = res.disco_duro_esperanza_vida;
        this.precio = res.disco_duro_precio;
        this.descuento = res.disco_duro_descuento;
        this.destacado = res.disco_duro_destacado;
        this.disponibilidad = this.disponibilidades.find((e: any) => e.id === res.disponibilidad_id);
        this.almacen = this.almacenes.find((e: any) => e.id === res.almacen_id);
        this.selectedlote = this.lotes.find((e: any) => e.id === res.solicitud_recepcion_id);
        this.estado = this.estados.find((e: any) => e.id === res.estado_id);
        this.tamanoDiscoDuro = this.tamanosDiscoDuro.find((e: any) => e.id === res.tamano_id);
        this.marca = this.marcas.find((e: any) => e.id === res.marca_id);
        this.sistemaArchivo = this.sistemaArchivos.find((e: any) => e.id === res.sistema_archivos_id);
        this.tipoEntradaDiscoDuro = this.tipoEntradas.find((e: any) => e.id === res.tipo_entrada_id);
      }
    });
  }

  getMobile(){
    if(window.innerWidth <= 800){
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }
}
