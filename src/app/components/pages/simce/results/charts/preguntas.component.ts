import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HighchartsService } from '../../../../../services/highcharts.service';

@Component({
    selector: 'app-simce-preguntas-chart',
    templateUrl: './preguntas.component.html',
    styleUrls: ['./preguntas.component.scss']
})
export class PreguntasChartComponent implements OnInit {

    constructor(private highcharts: HighchartsService) { }

    @Input() data = {
        labels: [],
        correctas: [],
        incorrectas: []
    };    

    @ViewChild('charts') public chartEl: ElementRef;

    ngOnInit(): void {
        this.setData()
    }

    ngAfterViewInit() {
        console.log(this.data)
        console.log(this.options)
        this.highcharts.createChart(this.chartEl.nativeElement, this.options);
    }

    setData () {
        this.options.xAxis.categories = this.data.labels
        this.options.series[0].data = this.data.correctas
        this.options.series[1].data = this.data.incorrectas
    }

    options = {
        chart: {
            type: 'column',
            backgroundColor: "#f0f2f5",
            style: {
                width: '100%'
            }
        },
        title: {
            text: '<strong>Porcentaje general por preguntas</strong>',
            align: 'left',
        },
        xAxis: {
            categories: this.data.labels,
            crosshair: true,
            title: {
                text: 'Preguntas por evaluación'
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Porcentajes'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Respuestas correctas',
                data: this.data.correctas,
                color: '#6fcf97'
            },
            {
                name: 'Respuestas incorrectas',
                data: this.data.incorrectas,
                color: '#eb5757'
            }
        ],
        credits: {
            enabled: false
        }
    }
}