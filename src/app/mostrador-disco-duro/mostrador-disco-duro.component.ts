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
  selector: 'app-mostrador-disco-duro',
  standalone: true,
  imports: [CheckboxModule,
    ProgressSpinnerModule,
    FormsModule,
    MostradorProductoComponent,
    PaginatorModule,
    CardModule,
    AccordionModule],
  templateUrl: './mostrador-disco-duro.component.html',
  styleUrl: './mostrador-disco-duro.component.css'
})
export class MostradorDiscoDuroComponent {

  @Output() agregarAlCarroOutput = new EventEmitter<Producto>();

  discosDuros: any;

  loading = true;

  first = 1;
  page = 1;
  rows: any;
  totalRecords: any;

  estados: any;
  estadosModel: string[] = [];
  marcas: any;
  marcasModel: string[] = [];
  tamanos: any;
  tamanosModel: string[] = [];
  sistemaArchivos: any;
  sistemaArchivosModel: string[] = [];
  disponibilidades: any;
  disponibilidadesModel: string[] = [];
    capacidades: any[] = [{
    capacidad_nombre: "0 GB - 128 GB",
    id: 1
  },{
    capacidad_nombre: "128 GB - 256 GB",
    id: 2
  },{
    capacidad_nombre: "256 GB - 512 GB",
    id: 3
  },{
    capacidad_nombre: "512 GB - 1024 GB",
    id: 4
  },{
    capacidad_nombre: "1024 GB - 2048 GB",
    id: 5
  }];
  capacidadesModel: number[] = [];
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
  esperanzasModel: number[] = [];
    esperanzas: any[] = [{
    esperanza_nombre: "0 - 5.000",
    id: 1
  },{
    esperanza_nombre: "5.000 - 10.000",
    id: 2
  },{
    esperanza_nombre: "10.000 - 15.000",
    id: 3
  },{
    esperanza_nombre: "15.000 - 20.000",
    id: 4
  }];
  horas: any[] = [{
    hora_nombre: "0 H - 3 H",
    id: 1
  },{
    hora_nombre: "4 H - 10 H",
    id: 2
  },{
    hora_nombre: "11 H - 20 H",
    id: 3
  },{
    hora_nombre: "21 H - 50 H",
    id: 4
  },{
    hora_nombre: "51 H -  H",
    id: 5
  }];
  horasModel: number[] = [];
  descuentos: any;

  constructor(private loginService: LoginServiceService,
              private router: Router,
              private comprasService: ComprasService){}

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
    this.comprasService.getTamano().subscribe((res) => this.tamanos = res);
    this.comprasService.getSistemaArchivos().subscribe((res) => this.sistemaArchivos = res);
    this.comprasService.getDisponibilidad().subscribe((res: any) =>{
      this.disponibilidades = res.filter((producto: any) => producto.disponibilidad_nombre !== 'Vendido');
    });
    this.comprasService.getDiscosDuros(this.page,[],[],[],[],[],[],[],[],[]).subscribe((res: any) =>{
      this.discosDuros = res.data.map((item: any) => new Producto(item));
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
    this.comprasService.getDiscosDuros(this.page,
                                       this.disponibilidadesModel,
                                       this.estadosModel,
                                       this.tamanosModel,
                                       this.marcasModel,
                                       this.preciosModel,
                                       this.capacidadesModel,
                                       this.esperanzasModel,
                                       this.horasModel,
                                       this.sistemaArchivosModel).subscribe((res: any) =>{

      this.discosDuros = res.data.map((item: any) => new Producto(item));
      this.rows = res.per_page;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }

  onPageChange(event: any){
    this.page = event.page + 1;
    this.loading = true;
    this.comprasService.getDiscosDuros(this.page,
                                       this.disponibilidadesModel,
                                       this.estadosModel,
                                       this.tamanosModel,
                                       this.marcasModel,
                                       this.preciosModel,
                                       this.capacidadesModel,
                                       this.esperanzasModel,
                                       this.horasModel,
                                       this.sistemaArchivosModel).subscribe((res: any) =>{
      this.discosDuros = res.data.map((item: any) => new Producto(item));
      this.rows = res.per_page;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }

}
