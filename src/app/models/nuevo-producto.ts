export interface NuevoProducto {
  codigo: string;
  descripcion: string;
  cantidadEnSucursal: { [key: number]: number };
  hayStock?: boolean;
  cantMinima?: number;
  bulto: number;
  precioCosto: number|string;
  gananciaPorcentaje: number|string;
  gananciaNeto: number|string;
  precioVentaPublico: number|string;
  ivaPorcentaje: number|string;
  ivaNeto: number|string;
  oferta: boolean;
  porcentajeBonificacionOferta: number|string;
  porcentajeBonificacionPrecio: number|string;
  // precioBonificado: number|string;
  precioLista: number|string;
  ilimitado?: boolean;
  publico: boolean;
  fechaUltimaModificacion?: Date | number;
  nota: string;
  fechaVencimiento: Date | number;
  imagen?: number[];
}
