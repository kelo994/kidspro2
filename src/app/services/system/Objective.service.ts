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
export class ObjectiveService {

    private url = `${environment.apiBaseUrl}`;

    constructor(private http: HttpClient, public router: Router) { }

    getTokenSystem() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('tokenSystem')
            })
        };
    }


    getObjetivesPerSubject(subjectId) {
        return this.http.
        get(`${this.url}/admin/subjects/${subjectId}/objectives`)
            .pipe(timeout(5000),
                retry(1),
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                // tslint:disable-next-line:arrow-return-shorthand
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f); }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    save(data: any) {
        return this.http.post(`${this.url}/admin/objectives`, data)
            .pipe(
                catchError((error, c) => {
                    this.errorTime();
                    return throwError(error);
                }),
                switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
                finalize(() => { /*console.log('finilize')*/ }));
    }

    delete(id: any) {
        return this.http.delete(`${this.url}/admin/objectives/${id}`)
            .pipe(
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
