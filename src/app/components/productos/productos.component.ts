import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SucursalesService} from '../../services/sucursales.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BusquedaProductoCriteria} from '../../models/criterias/busqueda-producto-criteria';
import {Rubro} from '../../models/rubro';
import {RubrosService} from '../../services/rubros.service';
import {LoadingOverlayService} from '../../services/loading-overlay.service';
import {finalize, map} from 'rxjs/operators';
import {MensajeService} from '../../services/mensaje.service';
import {MensajeModalType} from '../mensaje-modal/mensaje-modal.component';
import {Producto} from '../../models/producto';
import {Pagination} from '../../models/pagination';
import {ProductosService} from '../../services/productos.service';
import {combineLatest, Observable} from 'rxjs';
import {Proveedor} from '../../models/proveedor';
import {ProveedoresService} from '../../services/proveedores.service';
import {ListadoBaseComponent} from '../listado-base.component';
import {FiltroOrdenamientoComponent} from '../filtro-ordenamiento/filtro-ordenamiento.component';
import {Rol} from '../../models/rol';
import {AuthService} from '../../services/auth.service';
import {Usuario} from '../../models/usuario';
import {BatchActionKey, BatchActionsService} from '../../services/batch-actions.service';
import {ActionConfiguration} from '../batch-actions-box/batch-actions-box.component';

let self = null;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent extends ListadoBaseComponent implements OnInit {
  isBatchActionsBoxCollapsed = true;
  ordenarPorOptionsP = [
    { val: 'descripcion', text: 'Descripción' },
    { val: 'codigo', text: 'Código' },
    { val: 'cantidadTotalEnSucursales', text: 'Total Sucursales' },
    { val: 'bulto', text: 'Venta x Cantidad' },
    { val: 'precioCosto', text: 'Precio Costo' },
    { val: 'gananciaPorcentaje', text: '% Ganancia' },
    { val: 'precioLista', text: 'Precio Lista' },
    { val: 'fechaAlta', text: 'Fecha Alta' },
  ];

  sentidoOptionsP = [
    { val: 'ASC', text: 'Ascendente' },
    { val: 'DESC', text: 'Descendente' },
  ];

  ordenarPorAplicado = '';
  sentidoAplicado = '';
  @ViewChild('ordernarPorP', { static: false }) ordenarPorPElement: FiltroOrdenamientoComponent;
  @ViewChild('sentidoP', { static: false }) sentidoPElement: FiltroOrdenamientoComponent;

  rubros: Rubro[] = [];
  visibilidades = ['públicos', 'privados'];

  allowedRolesToDelete: Rol[] = [ Rol.ADMINISTRADOR ];
  hasRoleToDelete = false;

  baKey = BatchActionKey.PRODUCTOS;
  baActions: ActionConfiguration[] = [
    {
      description: 'Editar seleccionados',
      icon: ['fas', 'pen'],
      clickFn: () => this.router.navigate(['/productos/editar-multiple']),
    },
    {
      description: 'Eliminar seleccionados',
      icon: ['fas', 'trash'],
      clickFn: ids => this.eliminarSeleccionados(ids),
    }
  ];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected sucursalesService: SucursalesService,
              private fb: FormBuilder,
              private rubrosService: RubrosService,
              private authService: AuthService,
              public loadingOverlayService: LoadingOverlayService,
              protected mensajeService: MensajeService,
              public productosService: ProductosService,
              private proveedoresService: ProveedoresService,
              public batchActionsService: BatchActionsService) {
    super(route, router, sucursalesService, loadingOverlayService, mensajeService);
    self = this;
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadingOverlayService.activate();
    combineLatest([
      this.authService.getLoggedInUsuario(),
      this.rubrosService.getRubros()
    ]).pipe(finalize(() => this.loadingOverlayService.deactivate()))
      .subscribe(
        (data: [Usuario, Rubro[]]) => {
          this.hasRoleToDelete = this.authService.userHasAnyOfTheseRoles(data[0], this.allowedRolesToDelete);
          this.rubros = data[1];
        },
        err => this.mensajeService.msg(err.error, MensajeModalType.ERROR)
      )
    ;
  }

  getTerminosFromQueryParams(params = null) {
    const terminos: BusquedaProductoCriteria = {
      pagina: 0,
    };

    this.resetFilterForm();
    const ps = params ? params.params : this.route.snapshot.queryParams;
    const p = Number(ps.p);

    this.page = isNaN(p) || p < 1 ? 0 : (p - 1);
    terminos.pagina = this.page;

    if (ps.codODes) {
      this.filterForm.get('codODes').setValue(ps.codODes);
      terminos.codigo = ps.codODes;
      terminos.descripcion = ps.codODes;
    }

    if (ps.idRubro && !isNaN(ps.idRubro)) {
      this.filterForm.get('idRubro').setValue(Number(ps.idRubro));
      terminos.idRubro = Number(ps.idRubro);
    }

    if (ps.idProveedor && !isNaN(ps.idProveedor)) {
      this.filterForm.get('idProveedor').setValue(Number(ps.idProveedor));
      terminos.idProveedor = Number(ps.idProveedor);
    }

    if (this.visibilidades.indexOf(ps.visibilidad) >= 0) {
      this.filterForm.get('visibilidad').setValue(ps.visibilidad);
      if (ps.visibilidad === 'públicos') { terminos.publico = true; }
      if (ps.visibilidad === 'privados') { terminos.publico = false; }
    }

    if (ps.oferta) {
      this.filterForm.get('oferta').setValue(true);
      terminos.oferta = true;
    }

    let ordenarPorVal = this.ordenarPorOptionsP.length ? this.ordenarPorOptionsP[0].val : '';
    if (ps.ordenarPor) { ordenarPorVal = ps.ordenarPor; }
    this.filterForm.get('ordenarPor').setValue(ordenarPorVal);
    terminos.ordenarPor = ordenarPorVal;

    const sentidoVal = ps.sentido ? ps.sentido : 'ASC';
    this.filterForm.get('sentido').setValue(sentidoVal);
    terminos.sentido = sentidoVal;

    return terminos;
  }

  getItemsObservableMethod(terminos): Observable<Pagination> {
    return this.productosService.buscar(terminos as BusquedaProductoCriteria);
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      codODes: '',
      idRubro: null,
      idProveedor: null,
      visibilidad: null,
      oferta: false,
      ordenarPor: '',
      sentido: '',
    });
  }

  resetFilterForm() {
    this.filterForm.reset({
      codODes: '',
      idRubro: null,
      idProveedor: null,
      visibilidad: null,
      oferta: false,
      ordenarPor: '',
      sentido: '',
    });
  }

  getFormValues() {
    const values = this.filterForm.value;
    const ret: {[k: string]: any} = {};

    if (values.codODes) { ret.codODes = values.codODes; }
    if (values.idRubro) { ret.idRubro = values.idRubro; }
    if (values.idProveedor) { ret.idProveedor = values.idProveedor; }
    if (values.visibilidad) { ret.visibilidad = values.visibilidad; }
    if (values.oferta) { ret.oferta = values.oferta; }
    if (values.ordenarPor) { ret.ordenarPor = values.ordenarPor; }
    if (values.sentido) { ret.sentido = values.sentido; }

    return ret;
  }

  getAppliedFilters() {
    const values = this.filterForm.value;
    this.appliedFilters = [];

    if (values.codODes) {
      this.appliedFilters.push({ label: 'Código/Descripción', value: values.codODes });
    }

    if (values.idRubro) {
      this.appliedFilters.push({ label: 'Rubro', value: values.idRubro, asyncFn: this.getRubroInfoAsync(values.idRubro) });
    }

    if (values.idProveedor) {
      this.appliedFilters.push({ label: 'Proveedor', value: values.idProveedor, asyncFn: this.getProveedorInfoAsync(values.idProveedor) });
    }

    if (values.visibilidad) {
      this.appliedFilters.push({
        label: 'Visibilidad',
        value: values.visibilidad.length ? (values.visibilidad.charAt(0).toUpperCase() + values.visibilidad.slice(1)) : '',
      });
    }

    if (values.oferta) {
      this.appliedFilters.push({ label: '', value: 'Solo Ofertas' });
    }

    setTimeout(() => {
      this.ordenarPorAplicado = this.ordenarPorPElement ? this.ordenarPorPElement.getTexto() : '';
      this.sentidoAplicado = this.sentidoPElement ? this.sentidoPElement.getTexto() : '';
    }, 500);
  }

  getRubroInfoAsync(id: number): Observable<string> {
    return this.rubrosService.getRubro(id).pipe(map((r: Rubro) => r.nombre));
  }

  getProveedorInfoAsync(id: number): Observable<string> {
    return this.proveedoresService.getProveedor(id).pipe(map((p: Proveedor) => p.razonSocial));
  }

  verProducto(producto: Producto) {
    this.router.navigate(['/productos/ver', producto.idProducto]);
  }

  editarProducto(producto: Producto) {
    this.router.navigate(['/productos/editar', producto.idProducto]);
  }

  puedeEliminarProducto(): boolean {
    return this.hasRoleToDelete;
  }

  eliminarProducto(producto: Producto) {
    if (!this.puedeEliminarProducto()) {
      this.mensajeService.msg('No posee permiso para eliminar un producto.', MensajeModalType.ERROR);
      return;
    }

    const msg = `¿Está seguro que desea eliminar el producto "${producto.descripcion}"?`;

    this.mensajeService.msg(msg, MensajeModalType.CONFIRM).then((result) => {
      if (result) {
        this.loadingOverlayService.activate();
        this.productosService.eliminarProductos([producto.idProducto])
          .subscribe(
            () => {
              this.batchActionsService.removeElememt(this.baKey, producto.idProducto);
              // no se hace this.loadingOverlayService.deactivate() porque necesita que se recargue el reload
              location.reload();
            },
            err => {
              this.loadingOverlayService.deactivate();
              this.mensajeService.msg(err.error, MensajeModalType.ERROR);
            },
          )
        ;
      }
    }, () => {});
  }

  eliminarSeleccionados(ids: number[]) {
    const msg = '¿Desea eliminar los productos seleccionandos?';
    this.mensajeService.msg(msg, MensajeModalType.CONFIRM).then((result) => {
      if (result) {
        this.loadingOverlayService.activate();
        this.productosService.eliminarProductos(ids)
          .subscribe(
            () => {
              this.batchActionsService.clear(this.baKey);
              location.reload();
              // no se hace this.loadingOverlayService.deactivate() porque necesita que se recargue el reload
            },
            err => {
              this.loadingOverlayService.deactivate();
              this.mensajeService.msg(err.error, MensajeModalType.ERROR);
            },
          )
        ;
      }
    });
  }
}
