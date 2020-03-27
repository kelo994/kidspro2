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
export class ReporteService {

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

    // Curso
    getACursosGraficos(rol, idx) {
        let urlGraf = '';
        if (rol == 2) {
            urlGraf = `establecimientos/${idx}/cursos`;
        } else {
            urlGraf = `funcionarios/${idx}/cursos`;
        }
        return this.http.get(`${this.url}/${urlGraf}`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));;
    }

    getUnidades(idCurso) {
        return this.http.get(`${this.url}/dashboard/cursos/${idCurso}`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));
    }

    getObjetivos(idUnidad) {
        return this.http.get(`${this.url}/dashboard/cursos/${idUnidad}`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));
    }

    getACursosGraficosTwo(idx) {
        return this.http.get(`${this.url}/dashboard/cursos/${idx},`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));
    }

    // Asignaturas
    getAsignaturasCurso(curso_id) {
        return this.http.get(`${this.url}/cursos/${curso_id}/asignaturas`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));;
    }

    //obtiene el contenido de una asignatura (unidades, bloques, objetivos, habilidades)
    getDataAsignatura(idCurso: any, idAsignatura: any) {
        return this.http.get(`${this.url}/detalleAsignatura/${idCurso}/${idAsignatura}`, this.getToken());
    }

    // obtener estudiantes de un curso
    getEstudiantesCurso(idx) {
        return this.http.get(`${this.url}/cursos/especificos/${idx}/estudiantes`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));
    }

    // obtener datos
    getObjetivosCursos(groupId) {
        return this.http.get(`${this.url}/grupos/${groupId}/objetivos`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));
    }

    //reporte 1
    getGraficoCurso(cursoId) {
        return this.http.get(`${this.url}/dashboard/cursos/${cursoId}`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));
    }
    //reporte 2
    getGraficoCursoUnidad(groupId) {
        return this.http.get(`${this.url}/dashboard/grupos/${groupId}`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));
    }

    //reporte 3
    getGraficoCursoUnidadObjetivo(cursoId, objetivoId) {
        return this.http.get(`${this.url}/dashboard/cursos/${cursoId}/objetivos/${objetivoId}`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));
    }

    //reporte act
    getBloques(asignaturaId){
        return this.http.get(`${this.url}/asignaturas/${asignaturaId}/bloques`, this.getToken()).pipe(timeout(5000),
        retry(3),
        catchError((error, c) => {
            this.errorTime();
            return throwError(error)
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
    }

    getgraficoActividad(cursoId, bloqueId, exigencia) {
        return this.http.get(`${this.url}/dashboard/cursos/${cursoId}/bloques/${bloqueId}/exigencia/${exigencia}`, this.getToken()).pipe(timeout(5000),
        catchError((error, c) => {
            this.errorTime();
            return throwError(error)
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
        
    }
    errorTime() {
        // this.toast.eternalToast('danger', 'Error Inesperado', 'Lo sentimos, no se ha podido realizar la solicitud, intentelo más tarde');
    }

}
