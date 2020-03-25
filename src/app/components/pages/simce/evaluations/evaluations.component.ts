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
  pruebasFinalizadas = [];
  pruebas_en_ejecucion;
  pruebasLoading = true;
  pruebasFinalizadasLoading = true;
  dataFirstChart;
  dataSecondChart;
  pruebasEnEspera;

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
  }

  getPruebasFuncionario() {
    this.simceService.getPruebasFuncionario(this.idFuncionario).subscribe((data: any) => { // Success
      this.pruebas = data.pruebas;
      this.pruebasEnEspera = data.pruebas_en_espera;
      this.dataFirstChart = data.firstPie
      this.dataSecondChart = data.secondPie
      this.highcharts.createChart(this.chartActivas.nativeElement, this.dataFirstChart);
      this.highcharts.createChart(this.chartResultados.nativeElement, this.dataSecondChart);
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
    if (tipo === 'ver') this.router.navigate(['/pages/simce/prueba'], { state: { evaluation: element } })
    if (tipo === 'resultados') this.router.navigate(['/pages/simce/resultados'], { state: { evaluation: element } })
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

}
