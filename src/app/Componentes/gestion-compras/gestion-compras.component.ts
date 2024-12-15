import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { LoginServiceService } from '../../Services/login-service.service';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { ComprasService } from '../../Services/compras.service';
import { MostradorHistorialComponent } from '../mostrador-historial/mostrador-historial.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-gestion-compras',
  standalone: true,
  imports: [ToastModule,
    ButtonModule,
    PaginatorModule,
    DropdownModule,
    InputTextModule,
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
  filtroCodigo: any;
  filtroCorreo: any;
  filtroEstado: any;

  estadoCompra: any;

  first = 1;
  page = 1;
  rows: any;
  totalRecords: any;

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
        this.filtroEstado = res[0];
      },
      complete: () =>{
        this.filtrar();
      }
    });

  }

  onPageChange(event: any){
    this.page = event.page + 1;
    this.comprasService.getCompras(this.page, this.filtroCodigo, this.filtroEstado, this.filtroCorreo).subscribe({
      next: (res: any) => {
        this.compras = res.data;
        this.rows = res.per_page;
        this.totalRecords = res.total;
      },
    });
  }

  show(compra: any){
    this.messageService.add({ severity: 'success', summary: 'Exito' , detail: 'Compra de codigo ' + compra.compra_codigo + ' actualizada a: "' + compra.estado_compra.estado_compra_nombre + '"'});
  }

  filtrar(){
    this.comprasService.getCompras(this.page, this.filtroCodigo, this.filtroEstado, this.filtroCorreo).subscribe({
      next: (res: any) => {
        this.compras = res.data;
        this.rows = res.per_page;
        this.totalRecords = res.total;
      },
    });
  }
}
