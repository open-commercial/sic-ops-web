export interface RenglonPedido {
  id_RenglonPedido: number;
  idProductoItem: number;
  codigoItem: string;
  descripcionItem: string;
  medidaItem: string;
  urlImagenItem: string;
  oferta: boolean;
  precioUnitario: number;
  cantidad: number;
  bonificacionPorcentaje: number;
  bonificacionNeta: number;
  subTotal: number;
  importeAnterior: number;
  importe: number;
}