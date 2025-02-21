import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { FacturasVentaComponent } from './components/facturas-venta/facturas-venta.component';
import { FacturasCompraComponent } from './components/facturas-compra/facturas-compra.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidosHomeComponent } from './components/pedidos-home/pedidos-home.component';
import { VerPedidoComponent } from './components/ver-pedido/ver-pedido.component';
import { FacturasVentaHomeComponent } from './components/facturas-venta-home/facturas-venta-home.component';
import { FacturaVentaComponent } from './components/factura-venta/factura-venta.component';
import { VerFacturaComponent } from './components/ver-factura/ver-factura.component';
import { FacturasCompraHomeComponent } from './components/facturas-compra-home/facturas-compra-home.component';
import { ProductosHomeComponent } from './components/productos-home/productos-home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { TraspasosComponent } from './components/traspasos/traspasos.component';
import { TraspasosHomeComponent } from './components/traspasos-home/traspasos-home.component';
import { VerTraspasoComponent } from './components/ver-traspaso/ver-traspaso.component';
import { TraspasoComponent } from './components/traspaso/traspaso.component';
import { ProductoMultiEditorComponent } from './components/producto-multi-editor/producto-multi-editor.component';
import { CajasHomeComponent } from './components/cajas-home/cajas-home.component';
import { CajasComponent } from './components/cajas/cajas.component';
import { VerCajaComponent } from './components/ver-caja/ver-caja.component';
import { RemitosHomeComponent } from './components/remitos-home/remitos-home.component';
import { RemitosComponent } from './components/remitos/remitos.component';
import { VerRemitoComponent } from './components/ver-remito/ver-remito.component';
import { RemitoComponent } from './components/remito/remito.component';
import { CuentasCorrientesClienteHomeComponent } from './components/cuentas-corrientes-cliente-home/cuentas-corrientes-cliente-home.component';
import { CuentasCorrientesClienteComponent } from './components/cuentas-corrientes-cliente/cuentas-corrientes-cliente.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CuentaCorrienteClienteComponent } from './components/cuenta-corriente-cliente/cuenta-corriente-cliente.component';
import { NotasDebitoVentaHomeComponent } from './components/notas-debito-venta-home/notas-debito-venta-home.component';
import { NotasDebitoVentaComponent } from './components/notas-debito-venta/notas-debito-venta.component';
import { NotasCreditoVentaHomeComponent } from './components/notas-credito-venta-home/notas-credito-venta-home.component';
import { NotasCreditoVentaComponent } from './components/notas-credito-venta/notas-credito-venta.component';
import { VerNotaComponent } from './components/ver-nota/ver-nota.component';
import { NotasCreditoCompraHomeComponent } from './components/notas-credito-compra-home/notas-credito-compra-home.component';
import { NotasCreditoCompraComponent } from './components/notas-credito-compra/notas-credito-compra.component';
import { NotasDebitoCompraHomeComponent } from './components/notas-debito-compra-home/notas-debito-compra-home.component';
import { NotasDebitoCompraComponent } from './components/notas-debito-compra/notas-debito-compra.component';
import { VerReciboComponent } from './components/ver-recibo/ver-recibo.component';
import { FacturaCompraComponent } from './components/factura-compra/factura-compra.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'pedidos', component: PedidosHomeComponent,
        children: [
          { path: '', component: PedidosComponent },
          { path: 'nuevo', component: PedidoComponent },
          { path: 'editar/:id', component: PedidoComponent },
          { path: 'ver/:id', component: VerPedidoComponent }
        ]
      },
      {
        path: 'facturas-venta', component: FacturasVentaHomeComponent,
        children: [
          { path: '', component: FacturasVentaComponent },
          { path: 'de-pedido/:id', component: FacturaVentaComponent },
          { path: 'ver/:id', component: VerFacturaComponent },
        ]
      },
      {
        path: 'facturas-compra', component: FacturasCompraHomeComponent,
        children: [
          { path: '', component: FacturasCompraComponent },
          { path: 'ver/:id', component: VerFacturaComponent },
          { path: 'nuevo', component: FacturaCompraComponent },
        ]
      },
      {
        path: 'productos', component: ProductosHomeComponent,
        children: [
          { path: '', component: ProductosComponent },
          { path: 'nuevo', component: ProductoComponent },
          { path: 'editar/:id', component: ProductoComponent },
          { path: 'ver/:id', component: VerProductoComponent },
          { path: 'editar-multiple', component: ProductoMultiEditorComponent }
        ]
      },
      {
        path: 'traspasos', component: TraspasosHomeComponent,
        children: [
          { path: '', component: TraspasosComponent },
          { path: 'nuevo', component: TraspasoComponent },
          { path: 'ver/:id', component: VerTraspasoComponent },
        ]
      },
      {
        path: 'cajas', component: CajasHomeComponent, runGuardsAndResolvers: 'always',
        children: [
          { path: '', component: CajasComponent },
          { path: 'ver/:id', component: VerCajaComponent },
        ]
      },
      {
        path: 'remitos', component: RemitosHomeComponent,
        children: [
          { path: '', component: RemitosComponent },
          { path: 'nuevo', component: RemitoComponent },
          { path: 'de-factura/:id', component: RemitoComponent },
          { path: 'ver/:id', component: VerRemitoComponent },
        ]
      },
      {
        path: 'clientes', component: CuentasCorrientesClienteHomeComponent,
        children: [
          { path: '', component: CuentasCorrientesClienteComponent },
          { path: 'nuevo', component: ClienteComponent },
          { path: 'editar/:id', component: ClienteComponent },
          { path: 'cuenta-corriente/:id', component: CuentaCorrienteClienteComponent }
        ]
      },
      {
        path: 'notas-credito-venta', component: NotasCreditoVentaHomeComponent,
        children: [
          { path: '', component: NotasCreditoVentaComponent },
          { path: 'ver/:id', component: VerNotaComponent }
        ]
      },
      {
        path: 'notas-debito-venta', component: NotasDebitoVentaHomeComponent,
        children: [
          { path: '', component: NotasDebitoVentaComponent },
          { path: 'ver/:id', component: VerNotaComponent }
        ]
      },
      {
        path: 'notas-credito-compra', component: NotasCreditoCompraHomeComponent,
        children: [
          { path: '', component: NotasCreditoCompraComponent },
          { path: 'ver/:id', component: VerNotaComponent }
        ]
      },
      {
        path: 'notas-debito-compra', component: NotasDebitoCompraHomeComponent,
        children: [
          { path: '', component: NotasDebitoCompraComponent },
          { path: 'ver/:id', component: VerNotaComponent }
        ]
      },
      {
        path: 'recibos',
        children: [
          { path: 'ver/:id', component: VerReciboComponent },
        ]
      },
      {
        path: 'configuracion', component: ConfiguracionComponent,
      },
      {
        path: 'proveedores',
        loadChildren: () => import('./feature-modules/cuentas-corrientes-proveedor/cuentas-corrientes-proveedor.module')
          .then(m => m.CuentasCorrientesProveedorModule)
      },
      {
        path: 'gastos',
        loadChildren: () => import('./feature-modules/gastos/gastos.module')
          .then(m => m.GastosModule)
      },
      {
        path: 'recibos-venta',
        loadChildren: () => import('./feature-modules/recibos-venta/recibos-venta.module')
          .then(m => m.RecibosVentaModule)
      },
      {
        path: 'recibos-compra',
        loadChildren: () => import('./feature-modules/recibos-compra/recibos-compra.module')
          .then(m => m.RecibosCompraModule)
      },
      {
        path: 'formas-de-pago',
        loadChildren: () => import('./feature-modules/formas-de-pago/formas-de-pago.module')
          .then(m => m.FormasDePagoModule)
      },
      {
        path: 'transportistas',
        loadChildren: () => import('./feature-modules/transportistas/transportistas.module')
          .then(m => m.TransportistasModule)
      },
      {
        path: 'sucursales',
        loadChildren: () => import('./feature-modules/sucursales/sucursales.module')
          .then(m => m.SucursalesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./feature-modules/usuarios/usuarios.module')
          .then(m => m.UsuariosModule)
      },
      {
        path: 'localidades',
        loadChildren: () => import('./feature-modules/localidades/localidades.module')
          .then(m => m.LocalidadesModule)
      },
      {
        path: 'rubros',
        loadChildren: () => import('./feature-modules/rubros/rubros.module')
          .then(m => m.RubrosModule)
      },
      {
        path: 'medidas',
        loadChildren: () => import('./feature-modules/medidas/medidas.module')
          .then(m => m.MedidasModule)
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// runGuardsAndResolvers: 'always' + onSameUrlNavigation: 'reload' se usan para que logout funcione bien
// si el logout redirecciona a la misma ruta, ej: desde home autenticado, this.storageService.clear y navigate to home.
