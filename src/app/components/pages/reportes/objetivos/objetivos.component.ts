import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HighchartsService } from '../../../../services/highcharts.service';
import { Router } from '@angular/router';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.scss']
})
export class ObjetivosComponent implements OnInit {

  constructor(private highcharts: HighchartsService, public router: Router) { }

  @ViewChild('analisisComparativo') public analisisComparativo: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  // lineChart
  public lineChartData: ChartDataSets[] = [
    { data: [830, 850, 840, 820, 860, 855, 840], label: 'Puntajes Mínimos' },
    { data: [728, 748, 740, 719, 876, 727, 790], label: 'Puntajes Máximos' },
    { data: [980, 980, 970, 990, 900, 970, 900], label: 'Puntaje Promedio' }
  ];
  public lineChartLabels: Label[] = ['01', '02', '03', '04', '05', '06', '07'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true, legend: { position: 'bottom', align: 'start' },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(33,150,83,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(148,159,177,0.8)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // yellow
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(242,153,74,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  // barChart
  public SystemName: string = "MF1";
  firstCopy = false;

  // data
  public barChartData: Array<number> = [40, 48, 50, 40, 38, 40, 59];

  public labelMFL: Array<any> = [
    { data: this.barChartData }
  ];
  // labels
  public barChartLabels: Array<any> = ["01", "02", "03", "04", "05", "06", "07"];

  public barChartOptions: any = {
    responsive: true,
    legend: { display: false },
    scales: {
      yAxes: [{
        ticks: {
          max: 60,
          min: 0,
        }
      }],
      xAxes: [{}],
    },
  };

  _barChartColors: Array<any> = [{
    backgroundColor: '#56ccf2',
    borderColor: '#56ccf2',
    pointBackgroundColor: '#56ccf2',
    pointBorderColor: '#56ccf2',
    pointHoverBackgroundColor: '#56ccf2',
    pointHoverBorderColor: '#56ccf2'
  }];



  public ChartType = 'bar';
}
