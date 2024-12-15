import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Producto } from '../../Classes/Producto';
import { MostradorCompraComponent } from '../mostrador-compra/mostrador-compra.component';

@Component({
  selector: 'app-gestion-historial-recepcion',
  standalone: true,
  imports: [ButtonModule,
    ScrollPanelModule,
    MostradorCompraComponent,
    CardModule],
  templateUrl: './gestion-historial-recepcion.component.html',
  styleUrl: './gestion-historial-recepcion.component.css'
})
export class GestionHistorialRecepcionComponent {

  @Input() recepcion: any;
  @Input() estados: any;
  @Output() confirmDialog = new EventEmitter<number>();
  @Output() cancelDialog = new EventEmitter<number>();

  discos: any[] = [];

  sendCancelDialog(){
    this.cancelDialog.emit(this.recepcion.id);
  }

  sendConfirmDialog(){
    this.confirmDialog.emit(this.recepcion.id);
  }

  ngOnInit(){
    this.recepcion.cable.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
    this.recepcion.ram.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
    this.recepcion.disco.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
    this.recepcion.periferico.forEach((disco: any) => {
      this.discos.push(new Producto(disco));
    });
  }

}
