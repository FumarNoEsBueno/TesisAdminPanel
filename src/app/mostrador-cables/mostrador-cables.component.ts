import { Component, EventEmitter, Output} from '@angular/core';
import { ComprasService } from '../Services/compras.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { Producto } from '../Classes/Producto';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { MostradorProductoComponent } from '../Componentes/mostrador-producto/mostrador-producto.component';
import { PaginatorModule } from 'primeng/paginator';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrador-cables',
  standalone: true,
  imports: [CardModule,
    AccordionModule,
    PaginatorModule,
    CheckboxModule,
    MostradorProductoComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './mostrador-cables.component.html',
  styleUrl: './mostrador-cables.component.css'
})
export class MostradorCablesComponent {

  constructor(private loginService: LoginServiceService,
              private router: Router,
              private comprasService: ComprasService){}

  @Output() agregarAlCarroOutput = new EventEmitter<Producto>();

  cables: any;

  estados: any;
  estadosModel: string[] = [];

  tipoEntrada: any;
  tipoEntradaModel: string[] = [];

  marcas: any;
  marcasModel: string[] = [];

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
  rows: any;
  first = 1;
  page = 1;
  totalRecords: any;
  loading = true;

  descuentos: any;

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
    this.comprasService.getDescuentos().subscribe((res) =>{
      this.descuentos = [{id: null, descuento_porcentaje: 0}];
      this.descuentos = this.descuentos.concat(res);
    });
    this.comprasService.getEstados().subscribe((res) => this.estados = res);
    this.comprasService.getMarcas().subscribe((res) => this.marcas = res);
    this.comprasService.getTipoEntrada().subscribe((res) => this.tipoEntrada = res);
    this.comprasService.getCables([],[],[],[],[]).subscribe({
      next: (res: any) => {
        this.cables = res.data.map((item: any) => new Producto(item));
        this.rows = res.per_page;
        this.totalRecords = res.total;
        this.loading = false;
      }
    })
  }

  onFilterChange(){
    this.loading = true;
    this.comprasService.getCables(
      this.page,
      this.estadosModel,
      this.marcasModel,
      this.tipoEntradaModel,
      this.preciosModel).subscribe((res: any) =>{

      this.cables = res.data.map((item: any) => new Producto(item));
      this.rows = res.per_page;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }

  onPageChange(event: any){
    this.page = event.page + 1;
    this.loading = true;
    this.comprasService.getCables(
      this.page,
      this.estadosModel,
      this.marcasModel,
      this.tipoEntradaModel,
      this.preciosModel).subscribe((res: any) =>{

      this.cables =res.data.map((item: any) => new Producto(item));
      this.rows = res.per_page;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }


  agregarAlCarro(cable: Producto){
    this.agregarAlCarroOutput.emit(cable);
  }

  reload(){
    this.onFilterChange();
  }
}
