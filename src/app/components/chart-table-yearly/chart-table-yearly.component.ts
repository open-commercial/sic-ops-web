import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChartDirective } from 'src/app/directives/chart.directive';
import { Sucursal } from 'src/app/models/sucursal';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart-table-yearly',
  templateUrl: './chart-table-yearly.component.html'
})
export class ChartTableYearlyComponent extends ChartDirective {
  @Input() title: string;
  @Input() dataType: 'compras' | 'ventas';
  @Input() sucursal: Sucursal;
  @Input() selectedYear: number;
  @Output() loadingDataChange = new EventEmitter<boolean>();

  constructor(private readonly chartService: ChartService) {
    super();
  }

  loadChartData(year: number): void {
    this.loadingData = true;
    const chartDataPurchaseSaleSupplier = this.dataType === 'compras' ?
      this.chartService.getChartDataPurchaseAnnualSupplier(year) :
      this.chartService.getChartDataSalesAnnualSupplier(year);
      this.loadingDataChange.emit(true)

    chartDataPurchaseSaleSupplier.subscribe({
      next: (data) => { this.handleChartData(data);
                        this.loadingData = false;
                        this.loadingDataChange.emit(false);
      },
      error: (err) => {console.log('Error al cargar datos', err);
                        this.loadingData = false;
                        this.loadingDataChange.emit(false);
      }
    })
  }

  setLoadingData(isloading: boolean) {
    this.loadingData = isloading;
  }

  isMonthOptional(): boolean {
    return true;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sucursal'] && changes['sucursal'].currentValue !== changes['sucursal'].previousValue) {
      const currentYear = new Date().getFullYear();
      this.selectedYear = currentYear;
      this.loadChartData(this.selectedYear);
    }
  }

}
