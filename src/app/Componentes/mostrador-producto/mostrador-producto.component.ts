import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Producto } from '../../Classes/Producto';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ComprasService } from '../../Services/compras.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mostrador-producto',
  standalone: true,
  imports: [
    ToastModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    ImageModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './mostrador-producto.component.html',
  styleUrl: './mostrador-producto.component.css'
})


export class MostradorProductoComponent {

  constructor(private messageService: MessageService,
              private comprasService: ComprasService){}

  @Input() producto: any;
  @Input() descuentos: any;
  @Output() agregarAlCarro = new EventEmitter<Producto>();

  visible = false;
  selectedDescuento: any;

  ngOnInit(){
    console.log(this.producto);
    this.selectedDescuento = this.descuentos.find(
      (descuento: any) => this.producto.descuento == descuento.descuento_porcentaje);
  }

  show() {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto actualizado correctamente' });
    }

  guardarCambios(){
    this.producto.descuento = this.selectedDescuento.descuento_porcentaje;
    this.producto.descuentoId = this.selectedDescuento.id;
    this.comprasService.updateProducto(this.producto).subscribe((res: any) => {
      this.show();
    });
  }

  anadirAlCarrito(){
    this.agregarAlCarro.emit(this.producto);
  }

  mostrarDetalles(){
    this.visible = true;
  }

}
