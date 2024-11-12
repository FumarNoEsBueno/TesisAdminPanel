import { Component, EventEmitter, Output} from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ComprasService } from '../Services/compras.service';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Producto } from '../Classes/Producto';
import { MostradorProductoComponent } from '../Componentes/mostrador-producto/mostrador-producto.component';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrador-ram',
  standalone: true,
  imports: [CheckboxModule,
    ProgressSpinnerModule,
    FormsModule,
    MostradorProductoComponent,
    PaginatorModule,
    CardModule,
    AccordionModule],
  templateUrl: './mostrador-ram.component.html',
  styleUrl: './mostrador-ram.component.css'
})
export class MostradorRamComponent {

  constructor(private loginService: LoginServiceService,
              private comprasService: ComprasService,
              private router: Router) { }

  rams: any;

  loading = true;

  first = 1;
  page = 1;
  rows: any;
  totalRecords: any;

  estados: any;
  estadosModel: string[] = [];
  marcas: any;
  marcasModel: string[] = [];
  tipos: any;
  tipoModel: string[] = [];
  velocidads: any;
  velocidadModel: string[] = [];
  tamanos: any;
  tamanosModel: string[] = [];
  capacidad: any;
  capacidadModel: string[] = [];
  precios: any[] = [{
    precio_nombre: "0 - 10.000",
    id: 1
  },{
    precio_nombre: "10.001 - 20.000",
    id: 2
  },{
    precio_nombre: "20.001 - 30.000",
    id: 3
  }];
  preciosModel: any[] = [];
  descuentos: any;
  mobile: boolean = true;

  ngOnInit(){
    this.getMobile();
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
    this.comprasService.getDescuentos().subscribe((res) =>{
      this.descuentos = [{id: null, descuento_porcentaje: 0}];
      this.descuentos = this.descuentos.concat(res);
    });
    this.comprasService.getVelocidadRam().subscribe((res) => this.velocidads = res);
    this.comprasService.getTamanoRam().subscribe((res) => this.tamanos = res);
    this.comprasService.getEstados().subscribe((res) => this.estados = res);
    this.comprasService.getMarcas().subscribe((res) => this.marcas = res);
    this.comprasService.getCapacidadRam().subscribe((res) => this.capacidad = res);
    this.comprasService.getRams([],[],[],[],[],[],[],[]).subscribe((res: any) =>{
      this.rams = res.data.map((item: any) => new Producto(item));
      this.rows = res.per_page;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }

  reload(){
    this.onFilterChange();
  }

  onFilterChange(){
    this.loading = true;
    this.comprasService.getRams(
      this.page,
      this.estadosModel,
      this.marcasModel,
      this.capacidadModel,
      this.tipoModel,
      this.velocidadModel,
      this.tamanosModel,
      this.preciosModel).subscribe((res: any) =>{

      this.rams = res.data.map((item: any) => new Producto(item));
      this.rows = res.per_page;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }

  onPageChange(event: any){
    this.page = event.page + 1;
    this.loading = true;
    this.comprasService.getRams(
      this.page,
      this.estadosModel,
      this.marcasModel,
      this.capacidadModel,
      this.tipoModel,
      this.velocidadModel,
      this.tamanosModel,
      this.preciosModel).subscribe((res: any) =>{

      this.rams = res.data.map((item: any) => new Producto(item));
      this.rows = res.per_page;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }

  getMobile(){
    if(window.innerWidth <= 800){
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }
}
