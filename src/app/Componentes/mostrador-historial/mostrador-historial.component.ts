import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MostradorCompraComponent } from '../mostrador-compra/mostrador-compra.component';
import { Producto } from '../../Classes/Producto';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ComprasService } from '../../Services/compras.service';

@Component({
  selector: 'app-mostrador-historial',
  standalone: true,
  imports: [CardModule,
    MostradorCompraComponent,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ScrollPanelModule],
  templateUrl: './mostrador-historial.component.html',
  styleUrl: './mostrador-historial.component.css'
})
export class MostradorHistorialComponent {

  constructor(private comprasService: ComprasService) { }

  @Input() compra: any;
  @Input() estados: any;

  @Output() actualzarEvent = new EventEmitter<any>();

  selectedEstado: any;
  estadosCompra: any;
  discos: Producto[] = [];

  pedidoPreparado(){
    if(this.compra.metodo_despacho.metodo_despacho_slug == "retiro"){
      let tempEstado = this.estados.find(
        (estado: any) => estado.estado_compra_slug == "listo");
        this.actualizarEstadoCompra(tempEstado);
    }else{
      let tempEstado = this.estados.find(
        (estado: any) => estado.estado_compra_slug == "transporte");
        this.actualizarEstadoCompra(tempEstado);
    }
  }

  confirmarRetiro(){
    let tempEstado = this.estados.find(
      (estado: any) => estado.estado_compra_slug == "retirado");
    this.actualizarEstadoCompra(tempEstado);
  }

  confirmarRecepcion(){
    let tempEstado = this.estados.find(
      (estado: any) => estado.estado_compra_slug == "retirado");
    this.actualizarEstadoCompra(tempEstado);
  }

  reprobarCompra(){
    let tempEstado = this.estados.find(
      (estado: any) => estado.estado_compra_slug == "cancelado");
    this.actualizarEstadoCompra(tempEstado);
  }

  aprobarCompra(){
    let tempEstado = this.estados.find(
      (estado: any) => estado.estado_compra_slug == "preparando");
    this.actualizarEstadoCompra(tempEstado);
  }

  actualizarEstadoCompra(estado: any){
    this.comprasService.updateEstadoCompra(estado, this.compra.id).subscribe({
      next: (res: any) => {
        this.compra = res;
        this.actualzarEvent.emit(res);
      }
    });
  }

  ngOnInit(){
    this.estadosCompra = this.estados.map((e: any) => ({
      name: e.estado_compra_nombre,
      slug: e.estado_compra_slug,
      code: e.id
    }));
    this.selectedEstado = this.estadosCompra.find(
      (e:any) => e.code === this.compra.estado_compra_id);
    this.compra.cables.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
    this.compra.rams.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
    this.compra.discos.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
    this.compra.perifericos.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
  }
}
