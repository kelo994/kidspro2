import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HighchartsService } from '../../../../../services/highcharts.service';

@Component({
    selector: 'app-simce-preguntas-chart',
    templateUrl: './preguntas.component.html',
    styleUrls: ['./preguntas.component.scss']
})
export class PreguntasChartComponent implements OnInit {

    constructor(private highcharts: HighchartsService) { }

    @Input() preguntas: any;
    @Input() data: any;
    categories = []

    @ViewChild('charts') public chartEl: ElementRef;

    ngOnInit(): void {
        this.setCategories()
    }

    ngAfterViewInit() {
        this.highcharts.createChart(this.chartEl.nativeElement, this.myOptions);
    }

    setCategories () {
        let array = []
        for (let i = 0; i < this.preguntas.length; i++) {
            array.push(this.preguntas[i].pregunta_numero);
        }
        this.categories = array;
        console.log(this.categories)
    }

    myOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Porcentaje general por preguntas'
        },
        xAxis: {
            categories: this.preguntas,
            crosshair: true,
            title: {
                text: 'Preguntas por evaluación'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Porcentajes'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            },
            {
                name: 'Respuestas incorrectas',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
            }
        ]
    }
}