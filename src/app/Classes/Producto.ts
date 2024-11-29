export class Producto {

  id: any;
  tipoProducto: any;
  nombre: any;
  imagenUrl: any;
  crystaldisk: any;
  esperanzaVida: any;
  horas: any;
  memoria: any;
  estado: any;
  precio: any;
  marca: any;
  sistemaArchivos: any;
  tamano: any;
  tipo_entrada: any;
  descuento: any;
  destacado: any;

  descripcion: any;
  tipo_periferico: any;


  tipo_ram: any;
  tamano_ram: any;
  velocidad_ram: any;
  capacidad: any;

  cantidad: any;
  cantidad_seleccionada: any;

  constructor(producto: any) {

    this.id = producto.id;
    this.estado = producto.estado_nombre;

    if(producto.periferico_nombre != null){
      this.tipoProducto = "periferico";
      this.nombre = producto.periferico_nombre;
      this.imagenUrl = producto.periferico_foto;
      this.precio = producto.periferico_precio;
      this.marca = producto.marca_nombre;
      this.descuento = producto.periferico_descuento;
      this.tipo_entrada = producto.tipo_entrada_nombre;
      this.tipo_periferico = producto.nombre_tipo_periferico;
      this.destacado = producto.periferico_destacado;
    }

    if(producto.disco_duro_nombre != null){
      this.tipoProducto = "disco";
      this.nombre = producto.disco_duro_nombre;
      this.precio = producto.disco_duro_precio;
      this.marca = producto.marca_nombre;
      this.descuento = producto.disco_duro_descuento;
      this.destacado = producto.disco_duro_destacado;
      this.crystaldisk = producto.disco_duro_crystaldisk;
      this.imagenUrl = producto.disco_duro_foto;
      this.esperanzaVida = producto.disco_duro_esperanza_vida;
      this.horas = producto.disco_duro_horas_encendido;
      this.memoria = producto.disco_duro_memoria;
      this.sistemaArchivos = producto.sistema_archivos_nombre;
      this.tipo_entrada = producto.tipo_entrada;
      this.tamano = producto.tamano_nombre;
    }

    if(producto.cable_nombre != null){
      this.tipoProducto = "cable";
      this.cantidad = producto.cable_cantidad;
      this.nombre = producto.cable_nombre;
      this.precio = producto.cable_precio;
      this.imagenUrl = producto.cable_foto;
      this.marca = producto.marca_nombre;
      this.descuento = producto.cable_descuento;
      this.tipo_entrada = producto.tipo_entrada_nombre;
      this.cantidad_seleccionada = 0;
      this.destacado = producto.cable_destacado;
      if(producto.pivot != null){
        this.cantidad_seleccionada = producto.pivot.compra_cable_cantidad;
      }
    }
    if(producto.ram_nombre != null){
      this.tipoProducto = "ram";
      this.nombre = producto.ram_nombre;
      this.imagenUrl = producto.ram_foto;
      this.precio = producto.ram_precio;
      this.marca = producto.marca_nombre;
      this.tipo_ram = producto.tipo_ram_nombre;
      this.descuento = producto.ram_descuento
      this.velocidad_ram = producto.velocidad_ram_velocidad;
      this.tamano_ram = producto.tamano_ram_nombre;
      this.capacidad = producto.capacidad_ram_capacidad;
      this.destacado = producto.ram_destacado;
    }


  }

}
