import {  Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HighchartsService } from '../../../../services/highcharts.service';
import { SimceService } from '../../../../services/simce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simce-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class SimceEvaluationsComponent implements OnInit {

  constructor(
    public simceService: SimceService,
    private highcharts: HighchartsService,
    public router: Router
  ) { }

  idFuncionario;
  idAsignatura;
  idCurso;

  pruebas = []
  pruebasLoading = true;
  pruebasFinalizadas = [];
  pruebasFinalizadasLoading = true;

  @ViewChild('charts') public chartEl: ElementRef;

  ngOnInit(): void {
    this.idFuncionario = localStorage.getItem('idFuncionario')
    this.idCurso = localStorage.getItem('CursoId')
    this.idAsignatura = localStorage.getItem('asignatureOpen')
    this.getPruebasFuncionario()
    this.getPruebasFinalizadasFuncionario()
  }

  ngAfterViewInit() {
    this.highcharts.createChart(this.chartEl.nativeElement, this.myOptions);
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

  actualizarEstadoPrueba() {
    /*this.simceService.actualizarEstadoPrueba(this.prueba.prueba_id, this.prueba.estado_id).subscribe((data: any) => { // Success
      this.prueba.estado_id = data.estado
      this.modalService.dismissAll();
      this.toast.showToast('success', data.titulo, data.mensaje)
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login'])
      if (error.status = 500) this.toast.showToast('danger', error.error.titulo, error.error.mensaje);
    })*/
  }

  obtenerCodigo(curso_especifico_id) {
    /*this.simceService.obtenerCodigo(curso_especifico_id).subscribe((data: any) => { // Success
      this.codigo = data;
      this.modalService.open(this.modalCode, {
        backdropClass: 'light-blue-backdrop',
        windowClass: 'animated fadeInDown', centered: true, scrollable: true
      })
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login'])
    })*/
  }

  verPrueba (element, tipo) {
    if (tipo === 'ver') this.router.navigate(['/pages/simce/prueba'], {state: {idPrueba: element.prueba_id, simce: element}})
    if (tipo === 'resultados') this.router.navigate(['/pages/simce/resultados'], {state: {idPrueba: element.prueba_id, simce: element}})
  }

  myOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Cantidad de Evaluaciones'
    },
    legend: {
      reversed: true
    },
    plotOptions : {
       pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: false
        },
        showInLegend: true
    }
    },
    series : [{
       type: 'pie',
       name: 'Evaluaciones activas',
       keys: ['name', 'y', 'selected', 'sliced'],
       data: [
        ['En espera', 7, false],
        ['Ejecución', 30, true, true],
       ]
    }]
  };

}
