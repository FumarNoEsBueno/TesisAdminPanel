import { Component } from '@angular/core';
import { LoginServiceService } from '../../Services/login-service.service';
import { Router } from '@angular/router';
import { ComprasService } from '../../Services/compras.service';
import { MostradorHistorialComponent } from '../mostrador-historial/mostrador-historial.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gestion-compras',
  standalone: true,
  imports: [ToastModule,
    MostradorHistorialComponent],
  templateUrl: './gestion-compras.component.html',
  providers: [MessageService],
  styleUrl: './gestion-compras.component.css'
})
export class GestionComprasComponent {

  constructor(private loginService: LoginServiceService,
              private messageService: MessageService,
              private comprasService: ComprasService,
              private router: Router) { }

  compras: any;
  estadoCompra: any;

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
    this.comprasService.getEstadoCompra().subscribe({
      next: (res: any) => {
        this.estadoCompra = res;
      },
    });

    this.comprasService.getCompras().subscribe({
      next: (res: any) => {
        this.compras = res.data;
      },
    });
  }

  show(compra: any){
    this.messageService.add({ severity: 'success', summary: 'Exito' , detail: 'Compra de codigo ' + compra.compra_codigo + ' actualizada a: "' + compra.estado_compra.estado_compra_nombre + '"'});
  }
}
