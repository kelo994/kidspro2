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
            finalize(() => { /*console.log('finilize')*/ }));;
    }

    // obtener datos
    getObjetivosCursos(idCurso, idAsignatura, idObjetivo) {
        return this.http.get(`${this.url}/analisisPorCursoObjetivos/${idCurso}/${idAsignatura}/${idObjetivo}`, this.getToken()).pipe(timeout(5000),
            retry(3),
            catchError((error, c) => {
                this.errorTime();
                return throwError(error)
            }),
            switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
            finalize(() => { /*console.log('finilize')*/ }));;
    }

    errorTime() {
        // this.toast.eternalToast('danger', 'Error Inesperado', 'Lo sentimos, no se ha podido realizar la solicitud, intentelo más tarde');
    }

}
