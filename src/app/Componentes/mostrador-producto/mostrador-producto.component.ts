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
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-mostrador-producto',
  standalone: true,
  imports: [
    InputTextModule,
    CheckboxModule,
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
  destacado: any;
  selectedDescuento: any;
  tempDescuento: any;

  ngOnInit(){
    this.selectedDescuento = this.producto.descuento;
    this.tempDescuento = this.producto.descuento;
    this.destacado = (this.producto.destacado == 1);
  }

  show() {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto actualizado correctamente' });
    }

  guardarCambios(){

    this.producto.descuento = this.selectedDescuento;
    this.producto.destacado = this.destacado;
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

  onInput(event: any){
    if(this.selectedDescuento != null){
      if(this.selectedDescuento > 9) return event.charCode == 8;
    }
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

}
