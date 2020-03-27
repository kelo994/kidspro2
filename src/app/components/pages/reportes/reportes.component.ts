import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  tipoReporte = '';
  cursos = [];
  secciones = [];
  selectSeccion;
  selectCurso: any;
  asignaturas = [];
  selectAsignatura: any;
  reportePage = 0;

  private parametersObservable: any;

  constructor(public rService: ReporteService, public router: Router, public rActive: ActivatedRoute, public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.parametersObservable = this.rActive.params.subscribe(params => {
      this.reportePage = 0;
      this.tipoReporte = params.area;
      this.coursesService.obtenerNivelesEstablecimiento(localStorage.getItem('idEstablecimiento')).subscribe((data: any) => { // Success
       // console.log(data)
        this.cursos = data;
        if (this.cursos.length > 0) {
          this.selectCurso = this.cursos[0];
          $('#cursoIdx').addClass('ant-menu-item-selected');
          //this.getAsignaturas();
          this.asignaturas = this.cursos[0].asignaturas;
          if (this.asignaturas.length > 0) {
            this.selectAsignatura = this.asignaturas[0];
            if (String(this.tipoReporte) == 'objetivos') this.reportePage = 1;
            else if (String(this.tipoReporte) == 'actividades') this.reportePage = 2;
          } else this.reportePage = 3;
        }
      }, (error) => {
        if (error.status === 401) { this.router.navigate(['/auth/login']); }
      });
    });
  }

  selectCourse(item) {
    this.reportePage = 0;
    this.selectCurso = item;
    localStorage.setItem('NivelId', this.selectCurso.nivel_id);
    this.asignaturas = this.selectCurso.asignaturas;
    this.secciones = this.selectCurso.cursos;
    this.selectSeccion = this.secciones;
    //this.getAsignaturas();
  }

  selectAsignature(idx) {
    this.selectAsignatura = idx;
    localStorage.setItem('AsignaturaId', this.selectAsignatura.asignatura_id);
  }

  sendDataReporte() {

  }

  ngOnDestroy() {
    this.parametersObservable.unsubscribe();
  }

}
