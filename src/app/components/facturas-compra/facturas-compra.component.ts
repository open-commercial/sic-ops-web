import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HelperService } from '../../services/helper.service';
import { finalize, map } from 'rxjs/operators';
import { Pagination } from '../../models/pagination';
import { FacturasCompraService } from '../../services/facturas-compra.service';
import { TipoDeComprobante } from '../../models/tipo-de-comprobante';
import { BusquedaFacturaCompraCriteria } from '../../models/criterias/busqueda-factura-compra-criteria';
import { SucursalesService } from '../../services/sucursales.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto';
import { ProveedoresService } from '../../services/proveedores.service';
import { ProductosService } from '../../services/productos.service';
import { Proveedor } from '../../models/proveedor';
import { FacturaCompra } from '../../models/factura-compra';
import { LoadingOverlayService } from '../../services/loading-overlay.service';
import { OrdenarPorFiltroComponent } from '../ordenar-por-filtro/ordenar-por-filtro.component';
import { ListaBaseComponent } from '../lista-base.component';

@Component({
  selector: 'app-facturas-compra',
  templateUrl: './facturas-compra.component.html',
  styleUrls: ['./facturas-compra.component.scss']
})
export class FacturasCompraComponent extends ListaBaseComponent implements OnInit {
  tiposFactura = [
    { val: TipoDeComprobante.FACTURA_A, text: 'Factura A' },
    { val: TipoDeComprobante.FACTURA_B, text: 'Factura B' },
    { val: TipoDeComprobante.FACTURA_X, text: 'Factura X' },
    { val: TipoDeComprobante.FACTURA_Y, text: 'Factura Y' },
    { val: TipoDeComprobante.PRESUPUESTO, text: 'Presupuesto' },
  ];

  ordenarPorOptions = [
    { val: 'fecha', text: 'Fecha' },
    { val: 'proveedor.razonSocial', text: 'Proveedor' },
    { val: 'total', text: 'Total' },
  ];

  helper = HelperService;

  ordenarPorAplicado = '';
  sentidoAplicado = '';
  @ViewChild('ordernarPor', { static: false }) ordenarPorElement: OrdenarPorFiltroComponent;
  @ViewChild('sentido', { static: false }) sentidoElement: OrdenarPorFiltroComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected sucursalesService: SucursalesService,
              private facturasCompraService: FacturasCompraService,
              private fb: FormBuilder,
              private proveedoresService: ProveedoresService,
              private productosService: ProductosService,
              private loadingOverlayService: LoadingOverlayService) {
    super(route, router, sucursalesService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getTerminosFromQueryParams(params = null) {
    const terminos: BusquedaFacturaCompraCriteria = {
      idSucursal: Number(this.sucursalesService.getIdSucursal()),
      pagina: 0,
    };

    this.filterForm.reset({
      idProveedor: '',
      idProducto: '',
      rangoFecha: null,
      tipoFactura: '',
      numSerie: '',
      numFactura: '',
      ordenarPor: '',
      sentido: '',
    });

    const ps = params ? params.params : this.route.snapshot.queryParams;

    if (ps.idProveedor && !isNaN(ps.idProveedor)) {
      this.filterForm.get('idProveedor').setValue(Number(ps.idProveedor));
      terminos.idProveedor = Number(ps.idProveedor);
    }

    if (ps.idProducto && !isNaN(ps.idProducto)) {
      this.filterForm.get('idProducto').setValue(Number(ps.idProducto));
      terminos.idProducto = Number(ps.idProducto);
    }

    if (ps.fechaDesde || ps.fechaHasta) {
      const aux = { desde: null, hasta: null };

      if (ps.fechaDesde) {
        const d = moment.unix(ps.fechaDesde).local();
        aux.desde = { year: d.year(), month: d.month() + 1, day: d.date() };
        terminos.fechaDesde = d.toDate();
      }

      if (ps.fechaHasta) {
        const h = moment.unix(ps.fechaHasta).local();
        aux.hasta = { year: h.year(), month: h.month() + 1, day: h.date() };
        terminos.fechaHasta = h.toDate();
      }

      this.filterForm.get('rangoFecha').setValue(aux);
    }

    if (ps.tipoComprobante) {
      this.filterForm.get('tipoFactura').setValue(ps.tipoComprobante);
      terminos.tipoComprobante = ps.tipoComprobante;
    }

    if (ps.numSerie) {
      this.filterForm.get('numSerie').setValue(ps.numSerie);
      terminos.numSerie = Number(ps.numSerie);
    }

    if (ps.numFactura) {
      this.filterForm.get('numFactura').setValue(ps.numFactura);
      terminos.numFactura = Number(ps.numFactura);
    }

    let ordenarPorVal = this.ordenarPorOptions.length ? this.ordenarPorOptions[0].val : '';
    if (ps.ordenarPor) { ordenarPorVal = ps.ordenarPor; }
    this.filterForm.get('ordenarPor').setValue(ordenarPorVal);
    terminos.ordenarPor = ordenarPorVal;

    const sentidoVal = ps.sentido ? ps.sentido : 'DESC';
    this.filterForm.get('sentido').setValue(sentidoVal);
    terminos.sentido = sentidoVal;

    return terminos;
  }

  getItems(terminos) {
    this.loadingOverlayService.activate();
    this.facturasCompraService.buscar(terminos as BusquedaFacturaCompraCriteria)
      .pipe(finalize(() => this.loadingOverlayService.deactivate()))
      .subscribe((p: Pagination) => {
        p.content.forEach((e) => this.items.push(e));
        this.totalElements = p.totalElements;
        this.totalPages = p.totalPages;
        this.size = p.size;
      })
    ;
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      idProveedor: '',
      idProducto: '',
      rangoFecha: null,
      tipoFactura: '',
      numSerie: '',
      numFactura: '',
      ordenarPor: '',
      sentido: '',
    });
  }

  getFormValues() {
    const values = this.filterForm.value;
    const ret: {[k: string]: any} = {};

    if (values.rangoFecha && values.rangoFecha.desde) {
      ret.fechaDesde = this.helper.getUnixDateFromNgbDate(values.rangoFecha.desde);
    }
    if (values.rangoFecha && values.rangoFecha.hasta) {
      ret.fechaHasta = this.helper.getUnixDateFromNgbDate(values.rangoFecha.hasta);
    }

    if (values.idProveedor) { ret.idProveedor = values.idProveedor; }
    if (values.idProducto) { ret.idProducto = values.idProducto; }
    if (values.tipoFactura) { ret.tipoComprobante = values.tipoFactura; }
    if (values.numSerie) { ret.numSerie = values.numSerie; }
    if (values.numFactura) { ret.numFactura = values.numFactura; }
    if (values.ordenarPor) { ret.ordenarPor = values.ordenarPor; }
    if (values.sentido) { ret.sentido = values.sentido; }

    return ret;
  }

  getAppliedFilters() {
    const values = this.filterForm.value;
    this.applyFilters = [];

    if (values.idProveedor) {
      this.applyFilters.push({ label: 'Proveedor', value: values.idProveedor, asyncFn: this.getProveedorInfoAsync(values.idProveedor) });
    }

    if (values.idProducto) {
      this.applyFilters.push({ label: 'Producto', value: values.idProducto, asyncFn: this.getProductoInfoAsync(values.idProducto) });
    }

    if (values.rangoFecha && values.rangoFecha.desde) {
      this.applyFilters.push({
        label: 'Fecha (desde)', value: HelperService.getFormattedDateFromNgbDate(values.rangoFecha.desde)
      });
    }

    if (values.rangoFecha && values.rangoFecha.hasta) {
      this.applyFilters.push({
        label: 'Fecha (hasta)', value: HelperService.getFormattedDateFromNgbDate(values.rangoFecha.hasta)
      });
    }

    if (values.tipoFactura) {
      this.applyFilters.push({ label: 'Tipo de Factura', value: values.tipoFactura.replace('_',  ' ') });
    }

    if (values.numSerie || values.numFactura) {
      let ns = null;
      let nf = null;
      if (values.numSerie) {
        ns = Number(values.numSerie);
        ns = !isNaN(ns) ? ns : null;
      }
      if (values.numFactura) {
        nf = Number(values.numFactura);
        nf = !isNaN(nf) ? nf : null;
      }

      if (ns || nf) { this.applyFilters.push({ label: 'Nº Factura', value: this.helper.formatNumFactura(ns, nf) }); }
    }

    setTimeout(() => {
      this.ordenarPorAplicado = this.ordenarPorElement ? this.ordenarPorElement.getTexto() : '';
      this.sentidoAplicado = this.sentidoElement ? this.sentidoElement.getTexto() : '';
    }, 500);
  }

  getProveedorInfoAsync(id: number): Observable<string> {
    return this.proveedoresService.getProveedor(id).pipe(map((p: Proveedor) => p.razonSocial));
  }

  getProductoInfoAsync(id: number): Observable<string> {
    return this.productosService.getProducto(id).pipe(map((p: Producto) => p.descripcion));
  }

  verFactura(factura: FacturaCompra) {
    this.router.navigate(['/facturas-compra/ver', factura.idFactura]);
  }
}
