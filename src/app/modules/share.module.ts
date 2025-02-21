import { ReciboVentaActionsBarComponent } from './../components/recibo-venta-actions-bar/recibo-venta-actions-bar.component';
import { ReciboCompraActionsBarComponent } from '../components/recibo-compra-actions-bar/recibo-compra-actions-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FiltroOrdenamientoComponent} from '../components/filtro-ordenamiento/filtro-ordenamiento.component';
import {FiltrosAplicadosComponent} from '../components/filtros-aplicados/filtros-aplicados.component';
import {FiltrosFormComponent} from '../components/filtros-form/filtros-form.component';
import {MensajeAsincronicoComponent} from '../components/mensaje-asincronico/mensaje-asincronico.component';
import {UbicacionFormFieldComponent} from '../components/ubicacion-form-field/ubicacion-form-field.component';
import {ListaComponent} from '../components/lista/lista.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faImage, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faBars, faCircleNotch, faFileInvoice, faFilter,
  faSearch, faTrash, faCalendar, faPortrait,
  faTimes, faCheck, faExclamationTriangle, faCashRegister,
  faClipboardList, faPlus, faBarcode, faEdit,
  faBoxOpen, faMinus, faStore, faUser,
  faSignOutAlt, faInfoCircle, faQuestionCircle, faTimesCircle,
  faFileSignature, faPrint, faChevronLeft, faIndustry,
  faSuitcase, faPen, faEnvelope, faLink,
  faFolderOpen, faCopy, faArrowAltCircleDown, faExchangeAlt,
  faCheckSquare, faLockOpen, faLock, faSyncAlt, faCoins,
  faChevronDown, faChevronUp, faFileExport, faMapMarkerAlt,
  faUserCheck, faBook, faBalanceScaleRight, faBalanceScaleLeft,
  faTruck, faFileInvoiceDollar, faHandHoldingUsd,
  faMoneyBillWave, faTruckMoving, faCog, faUndoAlt, faUsers, faMapMarkedAlt,
  faCubes, faRulerCombined, faCheckDouble, faEllipsisV, faToggleOn, faBroom, faChartSimple, faSquarePollVertical
} from '@fortawesome/free-solid-svg-icons';
import {BatchActionsBoxComponent} from '../components/batch-actions-box/batch-actions-box.component';
import { NgBoostrapModule } from './ng-boostrap.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsuarioFiltroComponent} from '../components/usuario-filtro/usuario-filtro.component';
import {RangoFechaFiltroComponent} from '../components/rango-fecha-filtro/rango-fecha-filtro.component';
import {GastoFormComponent} from '../components/gasto-form/gasto-form.component';
import {ClienteFiltroComponent} from '../components/cliente-filtro/cliente-filtro.component';
import {ProveedorFiltroComponent} from '../components/proveedor-filtro/proveedor-filtro.component';
import { ReciboClienteModalComponent } from '../components/recibo-cliente-modal/recibo-cliente-modal.component';
import { ReciboProveedorModalComponent } from '../components/recibo-proveedor-modal/recibo-proveedor-modal.component';
import { UsuarioFormComponent } from '../components/usuario-form/usuario-form.component';
import { ImgPickerComponent } from '../components/img-picker/img-picker.component';
import { TotalesComponent } from '../components/totales/totales.component';
import { ListaTableComponent } from '../components/lista-table/lista-table.component';
import { FacturaVentaActionsBarComponent } from '../components/factura-venta-actions-bar/factura-venta-actions-bar.component';
import { PedidoActionsBarComponent } from '../components/pedido-actions-bar/pedido-actions-bar.component';
import { RemitoActionsBarComponent } from '../components/remito-actions-bar/remito-actions-bar.component';
import { NotaCreditoActionsBarComponent } from '../components/nota-credito-actions-bar/nota-credito-actions-bar.component';
import { NotaDebitoActionsBarComponent } from '../components/nota-debito-actions-bar/nota-debito-actions-bar.component';

@NgModule({
  declarations: [
    UsuarioFiltroComponent,
    ClienteFiltroComponent,
    ProveedorFiltroComponent,
    RangoFechaFiltroComponent,
    FiltroOrdenamientoComponent,
    FiltrosAplicadosComponent,
    FiltrosFormComponent,
    BatchActionsBoxComponent,
    ListaComponent,
    UbicacionFormFieldComponent,
    MensajeAsincronicoComponent,
    GastoFormComponent,
    ReciboClienteModalComponent,
    ReciboProveedorModalComponent,
    UsuarioFormComponent,
    ImgPickerComponent,
    TotalesComponent,
    ListaTableComponent,
    FacturaVentaActionsBarComponent,
    PedidoActionsBarComponent,
    ReciboCompraActionsBarComponent,
    ReciboVentaActionsBarComponent,
    RemitoActionsBarComponent,
    NotaCreditoActionsBarComponent,
    NotaDebitoActionsBarComponent,
  ],
  imports: [
    CommonModule,
    NgBoostrapModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgBoostrapModule,
    UsuarioFiltroComponent,
    ClienteFiltroComponent,
    ProveedorFiltroComponent,
    RangoFechaFiltroComponent,
    FiltroOrdenamientoComponent,
    FiltrosAplicadosComponent,
    FiltrosFormComponent,
    BatchActionsBoxComponent,
    ListaComponent,
    UbicacionFormFieldComponent,
    MensajeAsincronicoComponent,
    GastoFormComponent,
    UsuarioFormComponent,
    ImgPickerComponent,
    TotalesComponent,
    ListaTableComponent,
    FacturaVentaActionsBarComponent,
    PedidoActionsBarComponent,
    ReciboCompraActionsBarComponent,
    ReciboVentaActionsBarComponent,
    RemitoActionsBarComponent,
    NotaCreditoActionsBarComponent,
    NotaDebitoActionsBarComponent,
  ]
})
export class ShareModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBars, faCircleNotch, faFileInvoice, faFilter,
      faSearch, faTrash, faCalendar, faEye,
      faEyeSlash, faPortrait, faTimes, faCheck,
      faExclamationTriangle, faCashRegister, faClipboardList, faPlus,
      faBarcode, faEdit, faBoxOpen, faMinus,
      faStore, faUser, faSignOutAlt, faInfoCircle,
      faQuestionCircle, faTimesCircle, faFileSignature,
      faPrint, faChevronLeft, faIndustry, faSuitcase,
      faPen, faEnvelope, faLink, faFolderOpen,
      faCopy, faArrowAltCircleDown, faExchangeAlt, faCheckSquare,
      faLockOpen, faLock, faSyncAlt, faCoins,
      faChevronDown, faChevronUp, faCheckSquare, faFileExport,
      faMapMarkerAlt, faUserCheck, faBook, faBalanceScaleRight,
      faBalanceScaleLeft, faTruck, faFileInvoiceDollar,
      faHandHoldingUsd, faMoneyBillWave, faTruckMoving,
      faCog, faImage, faUndoAlt, faUsers, faMapMarkedAlt,
      faCubes, faRulerCombined, faSquare, faSquareCheck, faCheckDouble,
      faEllipsisV, faToggleOn, faBroom, faChartSimple, faSquarePollVertical
    );
  }
}
