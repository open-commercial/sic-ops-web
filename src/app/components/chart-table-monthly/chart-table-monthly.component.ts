import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChartDirective } from 'src/app/directives/chart.directive';
import { Sucursal } from 'src/app/models/sucursal';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart-table-monthly',
  templateUrl: './chart-table-monthly.component.html'
})
export class ChartTableMonthlyComponent extends ChartDirective {
  @Input() title: string;
  @Input() dataType: 'compras' | 'ventas';
  @Input() loadingData: boolean = false;
  @Input() sucursal: Sucursal;
  @Input() selectedMonth: number;
  @Input() selectedYear: number;
  @Output() loadingDataChange = new EventEmitter<boolean>();

  constructor(private readonly chartService: ChartService) {
    super();
  }

  loadChartData(year: number, month: number): void {
    this.loadingData = true;
    this.loadingDataChange.emit(true);
    const chartDataPurchaseSale = this.dataType === 'compras' ?
      this.chartService.getChartDataPurchaseMonthSupplier(year, month) :
      this.chartService.getChartDataSalesMonthSupplier(year, month);

        chartDataPurchaseSale.subscribe({
          next: (data) => { this.handleChartData(data);
                        this.loadingData = false;
                        this.loadingDataChange.emit(false);
      },
      });
  }

  setLoadingData(isloading: boolean) {
    this.loadingData = isloading;
  }

  isMonthOptional(): boolean {
    return false;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sucursal'] && changes['sucursal'].currentValue !== changes['sucursal'].previousValue) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      this.selectedYear = currentYear;
      this.selectedMonth = currentMonth;
      this.loadChartData(this.selectedYear, this.selectedMonth);
    }
  }
    
}
