import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartDirectiveDirective } from 'src/app/directives/chart-directive.directive';
import { Sucursal } from 'src/app/models/sucursal';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart-statistics-month',
  templateUrl: './chart-statistics-month.component.html',
  styleUrls: ['./chart-statistics-month.component.scss']
})
export class ChartStatisticsMonthComponent extends ChartDirectiveDirective {
  @Input() title: string = '';
  @Input() chartType: 'ventas' | 'compras' = 'compras';
  @Input() sucursal: Sucursal;
  @Input() selectedYear: number;
  chartDataArray: any[] = [];
  noDataAvailable: boolean = false;

  constructor(protected chartData: ChartService) {
    super(chartData);
  }

  override loadChartData(year: number): void {
    const allList = this.generateMonthsData().map(m => m.name);

    this.setLoadingState(true); 

    if (this.chartType === 'compras') {
      this.chartData.getChartDataPurchaseMonth(year).subscribe(data => {
        this.handleData(data, allList);
        this.setLoadingState(false); 
      });
    } else if (this.chartType === 'ventas') {
      this.chartData.getChartDataSalesMonth(year).subscribe(data => {
        this.handleData(data, allList);
        this.setLoadingState(false); 
      });
    }
  }

  handleData(data: any, allList: string[]): void {
    if (data?.labels?.length > 0) {
      const monthList = data.labels.map(labels => allList[parseInt(labels) - 1]);
      this.updateChart(data, monthList);
      this.chartDataArray = data.labels;
      this.noDataAvailable = false;
    } else {
      this.chartDataArray = [];
      this.noDataAvailable = true;
    }
    this.setLoadingState(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sucursal'] && changes['sucursal'].currentValue !== changes['sucursal'].previousValue) {
      const currentYear = new Date().getFullYear();
      this.selectedYear = currentYear;
    this.loadChartData(this.selectedYear);
    }
  }

}