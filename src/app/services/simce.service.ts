import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SimceService {

  private url = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, public router: Router) { }

  getToken() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
  }

  getTokenStudent() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('tokenStudent')
      })
    };
  }

  getNivelesCurso() {
    return this.http.get(`${this.url}/niveles`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getSimce() {
    return this.http.get(`${this.url}/simce/get/tipos`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getCursosFuncionarioAsignatura(idFuncionario, idAsignatura) {
    return this.http.get(`${this.url}/cursos/get/${idFuncionario}/${idAsignatura}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  obtenerCodigo(idCursoEspecifico) {
    return this.http.get(`${this.url}/obtener/codigo/${idCursoEspecifico}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getPruebasFuncionario(idFuncionario) {
    return this.http.get(`${this.url}/simce/pruebas/funcionario/${idFuncionario}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getPruebasFinalizadasFuncionario(idFuncionario) {
    return this.http.get(`${this.url}/simce/pruebas/finalizadas/${idFuncionario}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getPreguntasPrueba(idPrueba) {
    return this.http.get(`${this.url}/simce/preguntas/${idPrueba}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  agregarPrueba(data: any) {
    return this.http.post(`${this.url}/simce`, data, this.getToken())
      .pipe(timeout(10000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  actualizarEstadoPrueba(idPrueba, idEstado) {
    return this.http.put(`${this.url}/simce/actualizar/${idPrueba}/${idEstado}`, idPrueba , this.getToken())
  }

  guardarRepuesta (idPrueba, idEstudiante, idPregunta, data: any) {
    return this.http.put(`${this.url}/simce/${idPrueba}/${idEstudiante}/${idPregunta}`, data, this.getTokenStudent()).pipe(timeout(5000),
      retry(3),
      catchError((error, c) => {
        this.errorTime();
        return throwError(error)
      }),
      switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
      finalize(() => { /*console.log('finilize')*/ }));;
  }

  estadisticasPrueba(idPrueba) {
    return this.http.get(`${this.url}/simce/estadisticas/${idPrueba}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getCursosConSimce (idFuncionario) {
    return this.http.get(`${this.url}/cursos/pruebas/finalizadas/${idFuncionario}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getPruebaCursoEspecifico (idCursoEspecifico, idEstudiante) {
    return this.http.get(`${this.url}/simce/${idCursoEspecifico}/${idEstudiante}`, this.getTokenStudent())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  estadisticasCursoEspecifico (idCurso, idSimce) {
    return this.http.get(`${this.url}/simce/estadisticas/pruebas/${idCurso}/${idSimce}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  errorTime() {
    //this.toast.eternalToast('danger', 'Error Inesperado', 'Lo sentimos, no se ha podido realizar la solicitud, intentelo más tarde');
  }
}