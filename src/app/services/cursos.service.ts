import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { timeout, retry, catchError, switchMap, finalize } from 'rxjs/operators';
import { throwError, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class CursoService {

  private url = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, public router: Router) { }

  getToken() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      })
    };
  }

  // obtener asignaturas de un curso
  getAsignaturas(idCurso: any) {
    return this.http.get(`${this.url}/obtenerAsignaturasCurso/${idCurso}`, this.getToken());
  }

  openAsignatura(idCurso: any, idAsignatura: any) {
    return this.http.get(`${this.url}/bloques/activos/${idCurso}/${idAsignatura}`, this.getToken());
  }

  putUnidades(data: any, idAsignatura: any) {
    return this.http.put(`${this.url}/actualizarEstructuraGrupo/${idAsignatura}`, data, this.getToken())
  }

  obtenerCodigoCursoAsignatura(idCurso, idAsignatura) {
    return this.http.get(`${this.url}/obtener/codigo/${idCurso}/${idAsignatura}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError('error');
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  obtenerNivelesFuncionarioEstablecimiento(establecimientoId, funcionarioId) {
    return this.http.get(`${this.url}/establecimientos/${establecimientoId}/funcionarios/${funcionarioId}/niveles`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError('error');
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  obtenerAsignaturasPorEstablecimientoFuncionarioNivel(establecimientoId, funcionarioId, nivelId) {
    return this.http
        .get(`${this.url}/establecimientos/${establecimientoId}/funcionarios/${funcionarioId}/niveles/${nivelId}/asignaturas`
            , this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError('error');
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  obtenerCursosPorEstablecimientoFuncionarioNivelAsignatura(establecimientoId, funcionarioId, nivelId, asignaturaId) {
    return this.http
        .get(`${this.url}/establecimientos/${establecimientoId}/funcionarios/${funcionarioId}/niveles/${nivelId}/asignaturas/${asignaturaId}/cursos`
            , this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError('error');
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }


  errorTime() {
    // this.toast.eternalToast('danger', 'Error Inesperado', 'Lo sentimos, no se ha podido realizar la solicitud, intentelo más tarde');
  }

}
