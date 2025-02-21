import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Rol } from 'src/app/models/rol';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursal } from 'src/app/models/sucursal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  purchaseData: any[] = [];
  salesData: any[] = [];
  rol = Rol;
  fechaSeleccionada: Date = new Date();
  selectedYear: number;
  selectedMonth: number;
  allowedRolesToView = [Rol.ADMINISTRADOR];
  sucursalSeleccionada: Sucursal = null;
  subscription: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly chartService: ChartService,
    private readonly sucursalesService: SucursalesService,

    accordionConfig: NgbAccordionConfig) {
    accordionConfig.type = 'dark';
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    if (!this.authService.userHasAnyOfTheseRoles(this.allowedRolesToView)) {
      this.router.navigate(['pedidos']);
    }
     this.subscription.add(
      this.sucursalesService.sucursal$.subscribe((sucursal: Sucursal) => {
      this.sucursalSeleccionada = sucursal;
      this.resetData();
      this.cdr.detectChanges()
    })
   )

  }

  loadPurchaseData(): void {
    const currentYear = this.fechaSeleccionada.getFullYear();
    const currentMonth = this.fechaSeleccionada.getMonth() + 1;
    const componentPromises = [
      lastValueFrom(this.chartService.getChartDataPurchaseAnnual()),
      lastValueFrom(this.chartService.getChartDataPurchaseAnnualSupplier(currentYear)),
      lastValueFrom(this.chartService.getChartDataPurchaseMonth(currentYear)),
      lastValueFrom(this.chartService.getChartDataPurchaseMonthSupplier(currentYear, currentMonth)),
    ];
    Promise.all(componentPromises).then((data) => {
      this.purchaseData = data;
      this.cdr.detectChanges();
    }).catch(error => {
      console.error('Error cargando datos de compra:', error);
      this.cdr.detectChanges();
    })
  }

  loadSalesData(): void {
    const currentYear = this.fechaSeleccionada.getFullYear();
    const currentMonth = this.fechaSeleccionada.getMonth() + 1;
    const componentPromises = [
      lastValueFrom(this.chartService.getChartDataSalesAnnual()),
      lastValueFrom(this.chartService.getChartDataSalesAnnualSupplier(currentYear)),
      lastValueFrom(this.chartService.getChartDataSalesMonth(currentYear)),
      lastValueFrom(this.chartService.getChartDataSalesMonthSupplier(currentYear, currentMonth)),
    ];
    Promise.all(componentPromises).then((data) => {
      this.salesData = data;
      this.cdr.detectChanges();
    }).catch(error => {
      console.error('Error cargando datos de venta:', error);
      this.cdr.detectChanges();
    })
  }

  updateData(): void {
    this.fechaSeleccionada = new Date();
  }
  
  resetData(): void {
    this.updateData();
    this.selectedYear = this.fechaSeleccionada.getFullYear();
    this.selectedMonth = this.fechaSeleccionada.getMonth() + 1;
    this.purchaseData = [];
    this.salesData = [];
    this.loadPurchaseData();
    this.loadSalesData();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
