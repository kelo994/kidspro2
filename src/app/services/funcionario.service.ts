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
export class FuncionarioService {

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

  query() {
    return this.http.get(`${this.url}`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  save(data: any) {
    return this.http.post(`${this.url}/funcionarios`, data, this.getToken())
      .pipe(
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  update(id: any, data: any) {
    return this.http.put(`${this.url}/funcionarios/${id}`, data, this.getToken())
  }

  updateProfesor(id: any, data: any) {
    return this.http.put(`${this.url}/profesores/${id}`, data, this.getToken())
  }

  delete(id: any) {
    return this.http.delete(`${this.url}/funcionarios/${id}`, this.getToken())
      .pipe(
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getFuncionariosEstablecimiento (establecimientoId) {
    return this.http.get(`${this.url}/establecimientos/${establecimientoId}/funcionarios`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getProfesoresEstablecimiento(establecimientoId: any) {
    return this.http.get(`${this.url}/establecimientos/${establecimientoId}/profesores`, this.getToken()).pipe(timeout(5000),
      retry(1),
      catchError((error, c) => {
        this.errorTime();
        return throwError(error)
      }),
      switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
      finalize(() => { /*console.log('finilize')*/ }));
  }

  getRolesFuncionario(idFuncionario: any) {
    return this.http.get(`${this.url}/funcionarios/roles/${idFuncionario}`, this.getToken())
      .pipe(catchError((error, c) => {
        this.errorTime();
        return throwError(error)
      }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  errorTime() {
    //this.toast.eternalToast('danger', 'Error Inesperado', 'Lo sentimos, no se ha podido realizar la solicitud, intentelo más tarde');
  }
}