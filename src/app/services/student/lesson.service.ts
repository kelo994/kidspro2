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
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class StudentLessonService {

    private url = `${environment.apiBaseUrl}`;

    constructor(private http: HttpClient, public router: Router) { }

    getTokenStudent() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('tokenStudent')
            })
        };
    }

    getBloqueAlumno(courseId, subjectId) {
        return this.http.get(`${this.url}/courses/${courseId}/subjects/${subjectId}/lessons`, this.getTokenStudent())
            .pipe(timeout(5000),
                retry(3),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error)
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    getDataByCode(codeID) {
        return this.http.get(`${this.url}/datos/codigos/${codeID}`, this.getTokenStudent())
            .pipe(timeout(5000),
                retry(3),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error)
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    getRepositoriosBloque(bloqueId) {
        return this.http.
        get(`${this.url}/estudiantes/bloques/${bloqueId}/repositorios`, this.getTokenStudent())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    descargarArchivo(nombre) {
        return this.http.
        get(`${this.url}/downloads/multimedias/${nombre}`, this.getTokenStudent())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    getRepositorios(usuarioRepositorioId, bloqueId) {
        return this.http.
        get(`${this.url}/estudiantes/usuarios/${usuarioRepositorioId}/bloques/${bloqueId}/repositorios`, this.getTokenStudent())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    sendActivityData (data) {
        console.log(data)
        return this.http.post(`${this.url}/ejercicios`, data);
    }

    errorTime() {
        // this.toast.eternalToast('danger', 'Error Inesperado', 'Lo sentimos, no se ha podido realizar la solicitud, intentelo más tarde');
    }

}
