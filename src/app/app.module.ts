import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from './components/home/home.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { registerLocaleData } from '@angular/common';
import { ProductoFiltroComponent } from './components/producto-filtro/producto-filtro.component';
import { FacturasVentaComponent } from './components/facturas-venta/facturas-venta.component';
import { FacturasCompraComponent } from './components/facturas-compra/facturas-compra.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ProductoModalComponent } from './components/producto-modal/producto-modal.component';
import { BusquedaCuentaCorrienteClienteComponent } from './components/busqueda-cuenta-corriente-cliente/busqueda-cuenta-corriente-cliente.component';
import { CantidadProductoModalComponent } from './components/cantidad-producto-modal/cantidad-producto-modal.component';
import { CuentaCorrienteClienteModalComponent } from './components/cuenta-corriente-cliente-modal/cuenta-corriente-cliente-modal.component';
import { UbicacionFacturacionComponent } from './components/ubicacion-facturacion-component/ubicacion-facturacion.component';
import { UbicacionModalComponent } from './components/ubicacion-modal-component/ubicacion-modal.component';
import { EliminarRenglonPedidoModalComponent } from './components/eliminar-renglon-pedido-modal/eliminar-renglon-pedido-modal.component';
import { UbicacionEnvioComponent } from './components/ubicacion-envio-component/ubicacion-envio.component';
import { MensajeModalComponent } from './components/mensaje-modal/mensaje-modal.component';
import { PedidosHomeComponent } from './components/pedidos-home/pedidos-home.component';
import { VerPedidoComponent } from './components/ver-pedido/ver-pedido.component';
import { FacturaVentaComponent } from './components/factura-venta/factura-venta.component';
import { FacturasVentaHomeComponent } from './components/facturas-venta-home/facturas-venta-home.component';
import { ClienteModalComponent } from './components/cliente-modal/cliente-modal.component';
import { UsuarioModalComponent } from './components/usuario-modal/usuario-modal.component';
import { ProveedorModalComponent } from './components/proveedor-modal/proveedor-modal.component';
import { BusquedaProductoComponent } from './components/busqueda-producto/busqueda-producto.component';
import { DisponibilidadStockModalComponent } from './components/disponibilidad-stock-modal/disponibilidad-stock-modal.component';
import { VerFacturaComponent } from './components/ver-factura/ver-factura.component';
import { FacturasCompraHomeComponent } from './components/facturas-compra-home/facturas-compra-home.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { ProductosHomeComponent } from './components/productos-home/productos-home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { TransportistaComponent } from './components/transportista/transportista.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { TraspasosComponent } from './components/traspasos/traspasos.component';
import { TraspasosHomeComponent } from './components/traspasos-home/traspasos-home.component';
import { VerTraspasoComponent } from './components/ver-traspaso/ver-traspaso.component';
import { TraspasoComponent } from './components/traspaso/traspaso.component';
import { ClienteInfoComponent } from './components/cliente-info/cliente-info.component';
import { ProductoMultiEditorComponent } from './components/producto-multi-editor/producto-multi-editor.component';
import { CalculosPrecioFormComponent } from './components/calculos-precio-form/calculos-precio-form.component';
import { CajasComponent } from './components/cajas/cajas.component';
import { CajasHomeComponent } from './components/cajas-home/cajas-home.component';
import { MontoModalComponent } from './components/monto-modal/monto-modal.component';
import { VerCajaComponent } from './components/ver-caja/ver-caja.component';
import { MovimientoCajaComponent } from './components/movimiento-caja/movimiento-caja.component';
import { NuevoGastoModalComponent } from './components/nuevo-gasto-modal/nuevo-gasto-modal.component';
import { RemitosComponent } from './components/remitos/remitos.component';
import { RemitosHomeComponent } from './components/remitos-home/remitos-home.component';
import { VerRemitoComponent } from './components/ver-remito/ver-remito.component';
import { RemitoComponent } from './components/remito/remito.component';
import { CuentasCorrientesClienteComponent } from './components/cuentas-corrientes-cliente/cuentas-corrientes-cliente.component';
import { CuentasCorrientesClienteHomeComponent } from './components/cuentas-corrientes-cliente-home/cuentas-corrientes-cliente-home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { NewOrUpdateUsuarioModalComponent } from './components/new-or-update-usuario-modal/new-or-update-usuario-modal.component';
import { OptionPickerModalComponent } from './components/option-picker-modal/option-picker-modal.component';
import { CuentaCorrienteClienteComponent } from './components/cuenta-corriente-cliente/cuenta-corriente-cliente.component';
import { NotasDebitoVentaHomeComponent } from './components/notas-debito-venta-home/notas-debito-venta-home.component';
import { NotasDebitoVentaComponent } from './components/notas-debito-venta/notas-debito-venta.component';
import { NotasCreditoVentaHomeComponent } from './components/notas-credito-venta-home/notas-credito-venta-home.component';
import { NotasCreditoVentaComponent } from './components/notas-credito-venta/notas-credito-venta.component';
import { NotaCreditoVentaSinFacturaModalComponent } from './components/nota-credito-venta-sin-factura-modal/nota-credito-venta-sin-factura-modal.component';
import { NotaCreditoVentaDetalleSinFacturaModalComponent } from './components/nota-credito-venta-detalle-sin-factura-modal/nota-credito-venta-detalle-sin-factura-modal.component';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';
import { NotaCreditoVentaFacturaModalComponent } from './components/nota-credito-venta-factura-modal/nota-credito-venta-factura-modal.component';
import { NotaDebitoVentaSinReciboModalComponent } from './components/nota-debito-venta-sin-recibo-modal/nota-debito-venta-sin-recibo-modal.component';
import { NotaCreditoVentaDetalleFacturaModalComponent } from './components/nota-credito-venta-detalle-factura-modal/nota-credito-venta-detalle-factura-modal.component';
import { NotaDebitoVentaDetalleSinReciboModalComponent } from './components/nota-debito-venta-detalle-sin-recibo-modal/nota-debito-venta-detalle-sin-recibo-modal.component';
import { NotaDebitoVentaReciboModalComponent } from './components/nota-debito-venta-recibo-modal/nota-debito-venta-recibo-modal.component';
import { NotaDebitoVentaDetalleReciboModalComponent } from './components/nota-debito-venta-detalle-recibo-modal/nota-debito-venta-detalle-recibo-modal.component';
import { VerNotaComponent } from './components/ver-nota/ver-nota.component';
import { NotasCreditoCompraComponent } from './components/notas-credito-compra/notas-credito-compra.component';
import { NotasCreditoCompraHomeComponent } from './components/notas-credito-compra-home/notas-credito-compra-home.component';
import { NotasDebitoCompraHomeComponent } from './components/notas-debito-compra-home/notas-debito-compra-home.component';
import { NotasDebitoCompraComponent } from './components/notas-debito-compra/notas-debito-compra.component';
import { ShareModule } from './modules/share.module';
import { VerReciboComponent } from './components/ver-recibo/ver-recibo.component';
import { SelectableListComponent } from './components/selectable-list/selectable-list.component';
import { FacturaCompraComponent } from './components/factura-compra/factura-compra.component';
import { NuevoRenglonFacturaModalComponent } from './components/nuevo-renglon-factura-modal/nuevo-renglon-factura-modal.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartBarGraphMonthlyComponent } from './components/chart-bar-graph-monthly/chart-bar-graph-monthly.component';
import { ChartTableMonthlyComponent } from './components/chart-table-monthly/chart-table-monthly.component';
import { ChartBarGraphYearlyComponent } from './components/chart-bar-graph-yearly/chart-bar-graph-yearly.component';
import { ChartTableYearlyComponent } from './components/chart-table-yearly/chart-table-yearly.component';
import { ChartTableComponent } from './components/chart-table/chart-table.component';
import localeEsAR from '@angular/common/locales/es-AR';
import localeEsARExtra from '@angular/common/locales/extra/es-AR';


registerLocaleData(localeEsAR, 'es-AR', localeEsARExtra);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SideNavComponent,
        HomeComponent,
        PedidosComponent,
        ProductoFiltroComponent,
        FacturasVentaComponent,
        FacturasCompraComponent,
        NavBarComponent,
        PedidoComponent,
        ProductoModalComponent,
        BusquedaCuentaCorrienteClienteComponent,
        CantidadProductoModalComponent,
        CuentaCorrienteClienteModalComponent,
        UbicacionFacturacionComponent,
        UbicacionEnvioComponent,
        UbicacionModalComponent,
        EliminarRenglonPedidoModalComponent,
        MensajeModalComponent,
        PedidosHomeComponent,
        VerPedidoComponent,
        FacturaVentaComponent,
        FacturasVentaHomeComponent,
        ClienteModalComponent,
        UsuarioModalComponent,
        ProveedorModalComponent,
        ProductosHomeComponent,
        ProductosComponent,
        BusquedaProductoComponent,
        DisponibilidadStockModalComponent,
        VerFacturaComponent,
        FacturasCompraHomeComponent,
        LoadingOverlayComponent,
        ProductosHomeComponent,
        ProductosComponent,
        VerProductoComponent,
        ProductoComponent,
        TransportistaComponent,
        PagosComponent,
        TraspasosComponent,
        TraspasosHomeComponent,
        VerTraspasoComponent,
        TraspasoComponent,
        ClienteInfoComponent,
        ProductoMultiEditorComponent,
        CalculosPrecioFormComponent,
        CajasComponent,
        CajasHomeComponent,
        MontoModalComponent,
        VerCajaComponent,
        MovimientoCajaComponent,
        NuevoGastoModalComponent,
        RemitosComponent,
        RemitosHomeComponent,
        VerRemitoComponent,
        RemitoComponent,
        CuentasCorrientesClienteComponent,
        CuentasCorrientesClienteHomeComponent,
        ClienteComponent,
        NewOrUpdateUsuarioModalComponent,
        OptionPickerModalComponent,
        CuentaCorrienteClienteComponent,
        NotasDebitoVentaHomeComponent,
        NotasDebitoVentaComponent,
        NotasCreditoVentaHomeComponent,
        NotasCreditoVentaComponent,
        NotaCreditoVentaSinFacturaModalComponent,
        NotaCreditoVentaDetalleSinFacturaModalComponent,
        ClienteDetalleComponent,
        NotaCreditoVentaFacturaModalComponent,
        NotaCreditoVentaDetalleFacturaModalComponent,
        NotaDebitoVentaSinReciboModalComponent,
        NotaDebitoVentaReciboModalComponent,
        NotaDebitoVentaDetalleSinReciboModalComponent,
        NotaDebitoVentaDetalleReciboModalComponent,
        VerNotaComponent,
        NotasCreditoCompraComponent,
        NotasCreditoCompraHomeComponent,
        NotasDebitoCompraHomeComponent,
        NotasDebitoCompraComponent,
        SelectableListComponent,
        VerReciboComponent,
        FacturaCompraComponent,
        NuevoRenglonFacturaModalComponent,
        ConfiguracionComponent,
        DashboardComponent,
        ChartBarGraphMonthlyComponent,
        ChartBarGraphYearlyComponent,
        ChartTableMonthlyComponent,
        ChartTableYearlyComponent,
        ChartTableComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgSelectModule,
        AppRoutingModule,
        ShareModule,
        NgChartsModule,
        FormsModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-AR' },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
