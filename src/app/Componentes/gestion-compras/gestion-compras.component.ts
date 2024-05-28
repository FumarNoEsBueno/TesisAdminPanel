import { Component } from '@angular/core';
import { LoginServiceService } from '../../Services/login-service.service';
import { Router } from '@angular/router';
import { ComprasService } from '../../Services/compras.service';
import { MostradorHistorialComponent } from '../mostrador-historial/mostrador-historial.component';

@Component({
  selector: 'app-gestion-compras',
  standalone: true,
  imports: [MostradorHistorialComponent],
  templateUrl: './gestion-compras.component.html',
  styleUrl: './gestion-compras.component.css'
})
export class GestionComprasComponent {

  constructor(private loginService: LoginServiceService,
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
        this.compras = res;
      },
    });
  }

}
