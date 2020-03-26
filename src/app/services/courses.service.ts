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
export class CoursesService {

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

    obtenerCursosEstablecimiento(idEstablecimiento, idRol) {
        return this.http.get(`${this.url}/obtenerCursosPorRolyEstablecimiento/${idEstablecimiento}/${idRol}`, this.getToken());
    }

    obtenerNivelesEstablecimiento(establecimientoId) {
        return this.http.get(`${this.url}/establecimientos/${establecimientoId}/niveles`, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    obtenerNivelesSinCrear(establecimientoId) {
        return this.http.get(`${this.url}/establecimientos/${establecimientoId}/niveles/libres`, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    crearCursos(data: any) {
        return this.http.post(`${this.url}/cursos`, data, this.getToken())
            .pipe(timeout(10000),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    obtenerCurso(cursoId) {
        return this.http.get(`${this.url}/curso/${cursoId}`, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    estudiantesCursoEstudianteSCurso(cursoId, establecimientoId) {
        return this.http.get(`${this.url}/estudiantesCurso/${cursoId}/${establecimientoId}`, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    obtenerAsignatura(asignaturaId) {
        return this.http.get(`${this.url}/asignaturas/${asignaturaId}`, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    obtenerProfesoresCursoAsignatura(asignaturaId, cursoId) {
        return this.http.get(`${this.url}/asignaturas/${asignaturaId}/curso/${cursoId}/profesores`, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    obtenerProfesoresEstablecimiento(establecimientoId) {
        return this.http.get(`${this.url}/establecimientos/${establecimientoId}/profesores`, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    agregarFuncionarioCurso(data: any) {
        return this.http.post(`${this.url}/gestionarCursoEspecifico`, data, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }



    errorTime() {
        // this.toast.eternalToast('danger', 'Error Inesperado', 'Lo sentimos, no se ha podido realizar la solicitud, intentelo más tarde');
    }
}
