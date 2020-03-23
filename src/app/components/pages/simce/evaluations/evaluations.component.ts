import {  Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HighchartsService } from '../../../../services/highcharts.service';
import { SimceService } from '../../../../services/simce.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simce-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class SimceEvaluationsComponent implements OnInit {
  searchEvaluaciones = '';
  searchHistorial = '';
  constructor(
    public simceService: SimceService,
    public modalService: NzModalService,
    private notification: NzNotificationService,
    private highcharts: HighchartsService,
    public router: Router
  ) { }

  idFuncionario;
  idAsignatura;
  idCurso;

  prueba: any;
  pruebas = []
  pruebasLoading = true;
  pruebasFinalizadas = [];
  pruebasFinalizadasLoading = true;

  @ViewChild('chartActivas') public chartActivas: ElementRef;
  @ViewChild('chartResultados') public chartResultados: ElementRef;

  ngOnInit(): void {
    this.idFuncionario = localStorage.getItem('idFuncionario')
    this.idCurso = localStorage.getItem('CursoId')
    this.idAsignatura = localStorage.getItem('asignatureOpen')
    this.getPruebasFuncionario()
    this.getPruebasFinalizadasFuncionario()
  }

  ngAfterViewInit() {
    this.highcharts.createChart(this.chartActivas.nativeElement, this.myOptions1);
    this.highcharts.createChart(this.chartResultados.nativeElement, this.myOptions2);
  }

  getPruebasFuncionario() {
    this.simceService.getPruebasFuncionario(this.idFuncionario).subscribe((data: any) => { // Success
      this.pruebas = data;
      this.pruebasLoading = false;
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login']);
    })
  }

  getPruebasFinalizadasFuncionario() {
    this.simceService.getPruebasFinalizadasFuncionario(this.idFuncionario).subscribe( (data: any) => { // Success
      this.pruebasFinalizadas = data.pruebas;
      this.pruebasFinalizadasLoading = false;
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login']);
    })
  }

  actualizarEstadoPrueba () {
    this.simceService.actualizarEstadoPrueba(this.prueba.prueba_id, this.prueba.estado_id).subscribe((data: any) => { // Success
      this.prueba.estado_id = data.estado
      this.getPruebasFuncionario()
      this.getPruebasFinalizadasFuncionario()
      this.notification.success(data.titulo, data.mensaje);
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login'])
      if (error.status = 500) this.notification.error(error.error.titulo, error.error.mensaje);
    })
  }

  obtenerCodigo(curso_especifico_id) {
    this.simceService.obtenerCodigo(curso_especifico_id).subscribe((data: any) => { // Success
      //this.codigo = data;
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login'])
    })
  }

  verPrueba (element, tipo) {
    if (tipo === 'ver') this.router.navigate(['/pages/simce/prueba'], {state: {idPrueba: element.prueba_id, simce: element}})
    if (tipo === 'resultados') this.router.navigate(['/pages/simce/resultados'], {state: {idPrueba: element.prueba_id, simce: element}})
  }

  newEvaluation (event) {
    this.pruebas.push(event)
    this.getPruebasFuncionario()
  }

  showConfirm(type, prueba): void {
    this.prueba = prueba
    let className = '';
    let okText = '';
    if (type === 'activar') {
      okText = 'Activar evaluación'
      className = 'modal-confirm-activar'
    } else if (type === 'finalizar') {
      okText = 'Finalizar evaluación'
      className = 'modal-confirm-finalizar'
    }
    this.modalService.confirm({
      nzTitle: '<i>¿Estas seguro de realizar esta acción?</i>',
      nzContent: '<b>Esta acción no se puede deshacer</b>',
      nzCancelText: 'Cancelar',
      nzOkText: okText,
      nzClassName: className,
      nzOnOk: () => this.actualizarEstadoPrueba()
    });
  }

  myOptions1 = {
    chart: {
      plotBackgroundColor: null,
      type: 'pie',
      height: 294.2,
      style: {
        float: 'right',
        maxWidth: '100%'
      }
    },
    title: {
      text: 'Cantidad de Evaluaciones',
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: '15px',
        fontWeight: '300'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions : {
       pie: {
        colors: ['#cfba29', '#52a564'],
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.y}',
        },
        showInLegend: true
      }
    },
    series : [{
       type: 'pie',
       name: 'Evaluaciones activas',
       keys: ['name', 'y'],
       data: [
        ['Evaluaciones en espera', 7],
        ['Evaluaciones en ejecución', 30,],
       ]
    }]
  };

  myOptions2 = {
    chart: {
      plotBackgroundColor: null,
      type: 'pie',
      height: 328,
      style: {
        float: 'right',
        maxWidth: '100%'
      }
    },
    title: {
      text: 'Cantidad de Evaluaciones',
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: '15px',
        fontWeight: '300'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions : {
       pie: {
        colors: ['#46e1ff', '#a442e1'],
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.y}',
        },
        showInLegend: true
      }
    },
    series : [{
       type: 'pie',
       name: 'Evaluaciones activas',
       keys: ['name', 'y'],
       data: [
        ['Lenguaje, Literatura y Comunicación', 7, false],
        ['Matemáticas', 30, true, true],
       ]
    }]
  };

}
