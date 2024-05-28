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

  selectedEstado: any;
  estadosCompra: any;
  discos: Producto[] = [];

  pedidoPreparado(){
  }

  cofirmarRetiro(){
  }

  cofirmarRecepcion(){
  }

  reprobarCompra(){
  }

  aprobarCompra(){
  }

  actualizarEstadoCompra(estado: any){
    this.comprasService.updateEstadoCompra(estado).subscribe({
      next: (res) => {
      }
    });
  }

  ngOnInit(){
    this.estadosCompra = this.estados.map((e: any) => ({
      name: e.estado_compra_nombre,
      code: e.id
    }));
    this.selectedEstado = this.estadosCompra.find(
      (e:any) => e.code === this.compra.estado_compra_id);
    this.compra.discos.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
    console.log(this.estadosCompra);
    console.log(this.compra);
  }
}
