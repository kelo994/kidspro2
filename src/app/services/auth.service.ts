import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const tokenName = 'token';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private isLogged$ = new BehaviorSubject(false);
  private url = `${environment.apiBaseUrl}`;
  public user = { username: 'Lukes', email: 'Luke@skywalker.com' }; // some data about user

  constructor(private http: HttpClient) { }

  public get isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false;
    }
  }

  public registrar(dataSend): Observable<any> {
    return this.http.post(`${this.url}/register`, dataSend)
      .pipe(
        map(data => {
          // login successful if there's a jwt token in the response
          return data;
        }))
      .pipe(timeout(5000),
        retry(3),
        catchError((error, c) => throwError(error)),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f)),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  public login(data): Observable<any> {
    return this.http.post(`${this.url}/login`, data)
      .pipe(
        map(data => {
          // login successful if there's a jwt token in the response
          //console.log("data login: " + data);
          localStorage.clear();
          let user: any = data;
          if (user.user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            let nombre = user.user.persona_nombre.split(' ');
            let apellido = user.user.persona_apellido.split(' ');
            localStorage.setItem('nombreCompleto', nombre[0] + ' ' + apellido[0]);
            user.username = nombre[0] + ' ' + apellido[0];
            user.email = user.user.persona_email;
            localStorage.setItem('user', JSON.stringify(user.user));
            localStorage.setItem('idFuncionario', JSON.stringify(user.user.id));
            localStorage.setItem('token', user.token);
            this.isLogged$.next(true);
          }
          return user;
        }))
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => { return throwError(error) }),
        switchMap(f => { /*console.log('do something with '+JSON.stringify(f));*/ return of(f) }),
        finalize(() => { /*console.log('finilize')*/ }));;
  }

  public activeAccount(dataSend, token) {
    return this.http.put<any>(`${this.url}/verificarUsuario/${token}`, { password: dataSend.password1, password_repeated: dataSend.password2 })
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        this.isLogged$.next(true);
        return data;
      }))
      .pipe(timeout(5000),
        retry(3),
        catchError((error, c) => throwError(error)),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f)),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  public signup(data) {
    return this.http.post(`${this.url}/signup`, data)
      .pipe(
        map((res: { user: any, token: string }) => {
          this.user = res.user;
          localStorage.setItem(tokenName, res.token);
          // only for example
          localStorage.setItem('username', res.user.username);
          localStorage.setItem('email', res.user.email);
          this.isLogged$.next(true);
          return this.user;
        }));
  }

  public get authToken(): string {
    return localStorage.getItem(tokenName);
  }

  public get userData(): Observable<any> {
    // send current user or load data from backend using token
    return this.loadUser();
  }

  private loadUser(): Observable<any> {
    // use request to load user data with token
    // it's fake and useing only for example
    if (localStorage.getItem('username') && localStorage.getItem('email')) {
      this.user = {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
      };
    }
    return of(this.user);
  }

  getLicenses() {
    return this.http.get(`${this.url}/teachers/licenses`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          console.log(error)
          return throwError(error);
        }),
        switchMap(f =>  /* console.log('do something with '+JSON.stringify(f));*/ of(f)),
        finalize(() => { /* console.log('finilize')*/ }));
  }

  getToken() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
  }

  // cambiar Estudiante
  comprobarPasswordProfesor(data: any) {
    return this.http.post(this.url + '/obtener-estudiantes-curso-codigo-acceso', { password: data.pass }, this.getToken())
      .pipe(timeout(5000),
        retry(0),
        catchError((error, c) => throwError(error)),
        switchMap(f =>  /* console.log('do something with '+JSON.stringify(f));*/ of(f)),
        finalize(() => { /* console.log('finilize')*/ }));
  }
}
