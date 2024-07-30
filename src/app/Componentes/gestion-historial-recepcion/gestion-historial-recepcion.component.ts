import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-gestion-historial-recepcion',
  standalone: true,
  imports: [ButtonModule,
    CardModule],
  templateUrl: './gestion-historial-recepcion.component.html',
  styleUrl: './gestion-historial-recepcion.component.css'
})
export class GestionHistorialRecepcionComponent {

  @Input() recepcion: any;
  @Input() estados: any;
  @Output() confirmDialog = new EventEmitter<number>();
  @Output() cancelDialog = new EventEmitter<number>();

  sendCancelDialog(){
    this.cancelDialog.emit(this.recepcion.id);
  }

  sendConfirmDialog(){
    this.confirmDialog.emit(this.recepcion.id);
  }

}
