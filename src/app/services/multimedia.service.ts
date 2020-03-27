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

const tokenName = 'token';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {

  private url = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, public router: Router) { }

  getToken() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
  }

  importEstudiantesACurso(formData, idCurso) {
    return this.http.post(`${this.url}/import_excel/import/${idCurso}`, formData, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  uploadFile(formData) {
    return this.http.post(`${this.url}/multimedia`, formData, this.getToken())
      .pipe(
        catchError((error, c) => {
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  errorUpload() {
    //this.toast.eternalToast('danger', 'Archivo Inválido', 'El archivo no corresponde con el formato solicitado');
  }
}