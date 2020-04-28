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
export class RepositorioService {

    private url = `${environment.apiBaseUrl}`;

    constructor(private http: HttpClient, public router: Router) { }

    getToken() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
            })
        };
    }

    getToken2() {
        return {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                Authorization: localStorage.getItem('token'),
            })
        };
    }

    getToken3() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/pdf',
                Authorization: localStorage.getItem('token'),
            })
        };
    }

    getToken4() {
        return {
            headers: new HttpHeaders({
                'Accept': 'application/json',
            })
        };
    }

    getRepositorios(usuarioRepositorioId, bloqueId) {
        return this.http.
        get(`${this.url}/usuarios/${usuarioRepositorioId}/bloques/${bloqueId}/repositorios`, this.getToken())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    getRepositoriosBloque(bloqueId) {
        return this.http.
        get(`${this.url}/bloques/${bloqueId}/repositorios`, this.getToken())
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
        get(`${this.url}/downloads/multimedias/${nombre}`, this.getToken3())
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    crearRepositorio(data) {
        return this.http.post(`${this.url}/repositorios`, data, this.getToken2())
            .pipe(timeout(10000),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }


    deleteRepositorios(repositorioId) {
        return this.http.delete(`${this.url}/repositorios/${repositorioId}`, this.getToken())
            .pipe(
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error)
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    crearRepositorioAdmin(data) {
        return this.http.post(`${this.url}/admin/repositories`, data, this.getToken4())
            .pipe(timeout(10000),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }


    deleteRepositoriosAdmin(repositorioId) {
        return this.http.delete(`${this.url}/admin/repositories/${repositorioId}`)
            .pipe(
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error)
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    getRepositoriosBlocks(typeId, blockId) {
        return this.http.
        get(`${this.url}/admin/users/${typeId}/blocks/${blockId}/repositories`)
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
