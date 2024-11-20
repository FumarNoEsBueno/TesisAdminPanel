import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LoginServiceService } from '../Services/login-service.service';
import { MessageService } from 'primeng/api';
import { ComprasService } from '../Services/compras.service';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { GestionHistorialRecepcionComponent } from '../Componentes/gestion-historial-recepcion/gestion-historial-recepcion.component';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-gestion-recepcion',
  standalone: true,
  imports: [PaginatorModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    GestionHistorialRecepcionComponent],
  providers: [MessageService],
  templateUrl: './gestion-recepcion.component.html',
  styleUrl: './gestion-recepcion.component.css'
})
export class GestionRecepcionComponent {

  constructor(private loginService: LoginServiceService,
              private messageService: MessageService,
              private comprasService: ComprasService,
              private router: Router) { }

  recepciones: any;
  estados: any;

  page = 1;
  first = 1;
  rows = 1;
  totalRecords = 1;

  confirmDialog = false;
  cancelDialog = false;

  recepcionSeleccionada: any;

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
    this.comprasService.getEstadosRecepcion().subscribe((res) => this.estados = res);
    this.comprasService.getRecepciones(this.page).subscribe({
      next: (res: any) => {
        this.recepciones = res.data;
        this.rows = res.per_page;
        this.totalRecords = res.total;
      },
      error: (err) => {
      }
    });
  }

  onPageChange(event: any){
    this.page = event.page + 1;
    this.comprasService.getRecepciones(this.page).subscribe({
      next: (res: any) => {
        this.recepciones = res.data;
        this.rows = res.per_page;
        this.totalRecords = res.total;
      },
      error: (err) => {
      }
    });
  }

  openCancelDialog(event: any){
    this.recepcionSeleccionada = event;
    this.cancelDialog = true;
  }

  openConfirmDialog(event: any){
    this.recepcionSeleccionada = event;
    this.confirmDialog = true;
  }

  confirmCancel(){
    this.comprasService.cancelarRecepcion(this.recepcionSeleccionada).subscribe({
      next: (res) => {
        this.getData();
        this.mensajeDeExito();
      }
    })
    this.cancelDialog = false;
  }

  closeCancelDialog(){
    this.cancelDialog = false;
  }

  mensajeDeExito(){
        this.messageService.add({ severity: 'success', summary: 'Recepcion actualizada exitosmente'});
  }

  confirmRecepcion(){
    this.comprasService.confirmarRecepcion(this.recepcionSeleccionada).subscribe({
      next: (res) => {
        this.getData();
        this.mensajeDeExito();
      }
    })
    this.confirmDialog = false;
  }

  closeConfirmDialog(){
    this.confirmDialog = false;
  }

}
