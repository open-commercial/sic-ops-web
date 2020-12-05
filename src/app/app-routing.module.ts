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
import {ProductoMultiEditorComponent} from './components/producto-multi-editor/producto-multi-editor.component';
import {RemitosHomeComponent} from './components/remitos-home/remitos-home.component';
import {RemitosComponent} from './components/remitos/remitos.component';
import {VerRemitoComponent} from './components/ver-remito/ver-remito.component';
import {RemitoComponent} from './components/remito/remito.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: '', redirectTo: '/pedidos', pathMatch: 'full' },
      { path: 'pedidos', component: PedidosHomeComponent,
        children: [
          { path: '', component: PedidosComponent },
          { path: 'nuevo', component: PedidoComponent },
          { path: 'editar/:id', component: PedidoComponent },
          { path: 'ver/:id', component: VerPedidoComponent }
        ]
      },
      { path: 'facturas-venta', component: FacturasVentaHomeComponent,
        children: [
          { path: '', component: FacturasVentaComponent },
          { path: 'de-pedido/:id', component: FacturaVentaComponent },
          { path: 'ver/:id', component: VerFacturaComponent },
        ]
      },
      { path: 'facturas-compra', component: FacturasCompraHomeComponent,
        children: [
          { path: '', component: FacturasCompraComponent },
          { path: 'ver/:id', component: VerFacturaComponent }
        ]
      },
      { path: 'productos', component: ProductosHomeComponent,
        children: [
          { path: '', component: ProductosComponent },
          { path: 'nuevo', component: ProductoComponent },
          { path: 'editar/:id', component: ProductoComponent },
          { path: 'ver/:id', component: VerProductoComponent },
          { path: 'editar-multiple', component: ProductoMultiEditorComponent }
        ]
      },
      { path: 'traspasos', component: TraspasosHomeComponent,
        children: [
          { path: '', component: TraspasosComponent },
          { path: 'nuevo', component: TraspasoComponent },
          { path: 'ver/:id', component: VerTraspasoComponent },
        ]
      },
      { path: 'remitos', component: RemitosHomeComponent,
        children: [
          { path: '', component: RemitosComponent },
          { path: 'nuevo', component: RemitoComponent },
          { path: 'de-factura/:id', component: RemitoComponent },
          { path: 'ver/:id', component: VerRemitoComponent },
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// runGuardsAndResolvers: 'always' + onSameUrlNavigation: 'reload' se usan para que logout funcione bien
// si el logout redirecciona a la misma ruta, ej: desde home autenticado, this.storageService.clear y navigate to home.
