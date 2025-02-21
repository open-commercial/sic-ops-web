import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { NgbAccordion, NgbAccordionConfig, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Output, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Rol } from '../../models/rol';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  providers: [NgbAccordionConfig]
})
export class SideNavComponent implements OnDestroy {
  tieneRolAdministrador = false;
  tieneRolAdminOEncargado = false;
  tieneRolVendedor = false;
  isSidenavOpen = false;
  menuData = [];
  @Output() menuOptionClick = new EventEmitter<void>();
  @ViewChild('accordion') accordion: NgbAccordion;
  subscription: Subscription;
  url = '';
  accordionActiveId = '';

  constructor(private readonly authService: AuthService,
              private readonly router: Router,              
              private readonly changeDetectorRef: ChangeDetectorRef,
              accordionConfig: NgbAccordionConfig,) {
    accordionConfig.type = 'dark';
    this.subscription = new Subscription();
    this.tieneRolAdministrador = this.authService.userHasAnyOfTheseRoles([Rol.ADMINISTRADOR]);
    this.tieneRolAdminOEncargado = this.authService.userHasAnyOfTheseRoles([Rol.ADMINISTRADOR, Rol.ENCARGADO]);
    this.tieneRolVendedor = this.authService.userHasAnyOfTheseRoles([Rol.VENDEDOR]);
    this.menuData = [
      {
        seccion: 'Administración',
        id: 'administracion',
        show: this.tieneRolAdminOEncargado,
        rutas: [
          { name: 'Cajas', icon: ['fas', 'cash-register'], route: '/cajas', show: true },
          { name: 'Formas de Pago', icon: ['fas', 'money-bill-wave'], route: '/formas-de-pago', show: true },
          { name: 'Gastos', icon: ['fas', 'hand-holding-usd'], route: '/gastos', show: true },
          { name: 'Localidades', icon: ['fas', 'map-marked-alt'], route: '/localidades', show: true },
          { name: 'Medidas', icon: ['fas', 'ruler-combined'], route: '/medidas', show: true },
          { name: 'Rubros', icon: ['fas', 'cubes'], route: '/rubros', show: true },
          { name: 'Transportistas', icon: ['fas', 'truck-moving'], route: '/transportistas', show: true },
        ],
      },
      {
        seccion: 'Compras',
        id: 'compras',
        show: this.tieneRolAdminOEncargado,
        rutas: [
          { name: 'Facturas', icon: ['fas', 'file-invoice'], route: '/facturas-compra', show: true },
          { name: 'Notas de Crédito', icon: ['fas', 'balance-scale-left'], route: '/notas-credito-compra', show: true },
          { name: 'Notas de Débito', icon: ['fas', 'balance-scale-right'], route: '/notas-debito-compra', show: true },
          { name: 'Proveedores', icon: ['fas', 'truck'], route: '/proveedores', show: true },
          { name: 'Recibos', icon: ['fas', 'file-invoice-dollar'], route: '/recibos-compra', show: true },
        ],
      },
      {
        seccion: 'Sistema',
        id: 'sistema',
        show: this.tieneRolAdministrador,
        rutas: [
          { name: 'Configuración', icon: ['fas', 'cog'], route: '/configuracion', show: true },
          { name: 'Sucursales', icon: ['fas', 'store'], route: '/sucursales', show: true },
          { name: 'Usuarios', icon: ['fas', 'users'], route: '/usuarios', show: true },
        ],
      },
      {
        seccion: 'Stock',
        id: 'stock',
        show: this.tieneRolAdminOEncargado || this.tieneRolVendedor,
        rutas: [
          { name: 'Productos', icon: ['fas', 'box-open'], route: '/productos', show: this.tieneRolAdminOEncargado },
          { name: 'Traspasos', icon: ['fas', 'exchange-alt'], route: '/traspasos', show: true },
        ],
      },
      {
        seccion: 'Ventas',
        id: 'ventas',
        show: true,
        rutas: [
          {
            name: 'Clientes',
            icon: ['fas', 'portrait'],
            route: '/clientes',
            show: this.tieneRolAdminOEncargado || this.tieneRolVendedor
          },
          {
            name: 'Facturas',
            icon: ['fas', 'file-invoice'],
            route: '/facturas-venta',
            show: this.tieneRolAdminOEncargado || this.tieneRolVendedor
          },
          {
            name: 'Notas de Crédito',
            icon: ['fas', 'balance-scale-left'],
            route: '/notas-credito-venta',
            show: this.tieneRolAdminOEncargado || this.tieneRolVendedor
          },
          {
            name: 'Notas de Débito',
            icon: ['fas', 'balance-scale-right'],
            route: '/notas-debito-venta',
            show: this.tieneRolAdminOEncargado || this.tieneRolVendedor
          },
          {
            name: 'Pedidos',
            icon: ['fas', 'clipboard-list'],
            route: '/pedidos',
            show: true
          },
          {
            name: 'Remitos',
            icon: ['fas', 'file-export'],
            route: '/remitos',
            show: this.tieneRolAdminOEncargado || this.tieneRolVendedor
          },
          {
            name: 'Recibos',
            icon: ['fas', 'file-invoice-dollar'],
            route: '/recibos-venta',
            show: this.tieneRolAdminOEncargado || this.tieneRolVendedor
          },
        ],
      },
    ];

    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          let url = '/' + event.urlAfterRedirects.split('/')[1];

          if (url.indexOf('?') >= 0) {
            url = url.split('?')[0];
          }
          const elemento = this.menuData.filter(m => {
            return m.rutas.filter(r => r.route.indexOf(url) === 0).length > 0;
          });

          this.accordionActiveId = elemento.length ? elemento[0].id : '';

          this.handleSidenavState(url);

        })
    );
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    this.handleSidenavState(currentUrl);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleSidenavState(url: string) {
    const routesCloseSideNav = ['/dashboard']
    if (routesCloseSideNav.includes(url)) {
      this.setSidenavState(false);
    } else {
      this.setSidenavState(this.isSidenavOpen);
    }

    this.changeDetectorRef.detectChanges();

  }

  setSidenavState(open: boolean) {
    if (this.isSidenavOpen !== open) {
      this.isSidenavOpen = open;
      if (!open) {
        this.menuOptionClick.emit();
      }
    }
  }
  openSideNav() {
    this.setSidenavState(true);
  }

  closeSidenav() {
    this.setSidenavState(false);
  }

  optionClick() {
    this.menuOptionClick.emit();
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if (this.accordion.isExpanded($event.panelId)) {
      $event.preventDefault();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.optionClick();
    }
  }
}
