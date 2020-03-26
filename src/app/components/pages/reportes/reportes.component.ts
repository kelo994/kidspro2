import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  tipoReporte = '';
  cursos = [];
  selectCurso: any;
  asignaturas = [];
  selectAsignatura: any;
  reportePage = 0;

  private parametersObservable: any;

  constructor(public rService: ReporteService, public router: Router, public rActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.parametersObservable = this.rActive.params.subscribe(params => {
      this.reportePage = 0;
      this.tipoReporte = params.area;
      this.rService.getACursosGraficos(localStorage.getItem('rolId'), localStorage.getItem('idFuncionario')).subscribe(
        (data: any) => { // Success
          // console.log(data);
          this.cursos = data;
          if (this.cursos.length > 0) {
            this.selectCurso = this.cursos[0];
            $('#cursoIdx').addClass('ant-menu-item-selected');
            this.getAsignaturas();
          }
          // cargando asignaturas
        },
        (error) => {
          console.log(error)
          if (error.status == 401) this.router.navigate(['/auth/login']);
          else if (error.status == 400) this.router.navigate(['/auth/login']);
        }
      );
    });
  }

  getAsignaturas() {
    this.asignaturas = [];
    this.rService.getAsignaturasCurso(this.selectCurso.id).subscribe(
      (data: any) => { // Success
        // console.log(data);
        this.asignaturas = data;
        if(this.asignaturas.length > 0) {
          this.selectAsignatura = this.asignaturas[0];
          if (String(this.tipoReporte) == 'objetivos') this.reportePage = 1;
          else if (String(this.tipoReporte) == 'actividades') this.reportePage = 2;
        } else this.reportePage = 3;
      },
      (error) => {
        console.log(error)
        if (error.status == 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status == 400) {
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  selectCourse(item) {
    this.reportePage = 0;
    this.selectCurso = item;
    this.getAsignaturas();
  }

  selectAsignature(idx) {
    this.selectAsignatura = idx;
  }

  sendDataReporte() {

  }

  ngOnDestroy() {
    this.parametersObservable.unsubscribe();
  }

}
