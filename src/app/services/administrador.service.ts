import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})

export class AdministradorService {
  private url = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, private notification: NzNotificationService, public router: Router) { }

  getToken() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
  }

  /****************************************************************************************/
  /**                                   SECCIONES                                        **/
  /****************************************************************************************/

  getSecciones() {
    return this.http.get(`${this.url}/sections`, this.getToken())
      .pipe(timeout(5000),
        retry(1),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addSeccion(data: any) {
    return this.http.post(`${this.url}/sections`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editSeccion(data: any, idx) {
    return this.http.put(`${this.url}/sections/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteSeccion(idx) {
    return this.http.delete(`${this.url}/sections/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  openSeccion(idx) {
    return this.http.get(`${this.url}/sections/${idx}/levels`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                   NIVELES                                          **/
  /****************************************************************************************/

  addNivel(data: any) {
    return this.http.post(`${this.url}/levels`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editNivel(data: any, idx) {
    return this.http.put(`${this.url}/levels/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteNivel(idx: any) {
    return this.http.delete(`${this.url}/levels/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   MERCADOS                                         **/
  /****************************************************************************************/
  getMercados(idx) {
    return this.http.get(`${this.url}/levels/${idx}/markets`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getZonas() {
    return this.http.get(`${this.url}/zones`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }


  getCurrency() {
    return this.http.get(`${this.url}/currencies`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addMarket(data: any) {
    return this.http.post(`${this.url}/markets`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editMercado(data: any, idx) {
    return this.http.put(`${this.url}/markets/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteMercado(idx: any) {
    return this.http.delete(`${this.url}/markets/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  openMarket(idx) {
    return this.http.get(`${this.url}/markets/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   Fabrica                                         **/
  /****************************************************************************************/
  getFabrica(idx) {
    return this.http.get(`${this.url}/markets/${idx}/factories`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  setFabrica(idx, data) {
    return this.http.put(`${this.url}/masters/data/factories/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                   JERARQUÍAS                                       **/
  /****************************************************************************************/
  getJerarquias() {
    return this.http.get(`${this.url}/hierarchies`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getCargosbyMarketandHierarchy(hierarchy_id, market_id) {
    return this.http.get(`${this.url}/hierarchies/${hierarchy_id}/markets/${market_id}/positions`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                   SBIF                                       **/
  /****************************************************************************************/
  getSbif() {
    return this.http.get(`${this.url}/financial/indicators`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                   Años                                       **/
  /****************************************************************************************/
  getYears() {
    return this.http.get(`${this.url}/years`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  addYears(data: any) {
    return this.http.post(`${this.url}/years`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editYears(data: any, idx) {
    return this.http.put(`${this.url}/years/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  delYears(idx: any) {
    return this.http.delete(`${this.url}/years/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   CALIDADES                                        **/
  /****************************************************************************************/
  getQualities() {
    return this.http.get(`${this.url}/qualities`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   Mercado Contenido                                **/
  /****************************************************************************************/

  /****************************************************************************************/
  /**                                   Categorías                                       **/
  /****************************************************************************************/
  getMarketCategorias(idx: any) {
    return this.http.get(`${this.url}/categories/markets/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  addMarketCategoria(data: any) {
    return this.http.post(`${this.url}/categories`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editMarketCategoria(data: any, idx) {
    return this.http.put(`${this.url}/categories/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteMarketCategoria(idx: any) {
    return this.http.delete(`${this.url}/categories/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   TipoIndicadores                                       **/
  /****************************************************************************************/
  getTipoIndicadores() {
    return this.http.get(`${this.url}/types/indicators`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  addTipoIndicadores(data: any) {
    return this.http.post(`${this.url}/types/indicators`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editTipoIndicadores(data: any, idx) {
    return this.http.put(`${this.url}/types/indicators/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteTipoIndicadores(idx: any) {
    return this.http.delete(`${this.url}/types/indicators/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   Indicadores                                       **/
  /****************************************************************************************/
  getIndicadores(typeIndicatorId, yearId) {
    return this.http.get(`${this.url}/types/indicators/${typeIndicatorId}/years/${yearId}/indicators`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editIndicadores(data: any, idx) {
    return this.http.put(`${this.url}/indicators/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   Productos                                        **/
  /****************************************************************************************/
  getMarketCategoriasProductos(idx: any) {
    return this.http.get(`${this.url}/categories/${idx}/products`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addMarketCategoriaProducto(data: any) {
    return this.http.post(`${this.url}/products`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editMarketCategoriaProducto(data: any, idx) {
    return this.http.put(`${this.url}/products/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteMarketCategoriaProducto(idx: any) {
    return this.http.delete(`${this.url}/products/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                  Materias Primas                                   **/
  /****************************************************************************************/
  getMateriasPrimas(idx: any) {
    return this.http.get(`${this.url}/categories/${idx}/raw/materials`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addMateriasPrimas(data: any) {
    return this.http.post(`${this.url}/raw/materials`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f => /*console.log('do something with '+JSON.stringify(f));*/ of(f)),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editMateriasPrimas(data: any, idx) {
    return this.http.put(`${this.url}/raw/materials/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => /*console.log('do something with '+JSON.stringify(f));*/ of(f)),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteMateriasPrimas(idx: any) {
    return this.http.delete(`${this.url}/raw/materials/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f => /*console.log('do something with '+JSON.stringify(f));*/ of(f)),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   Maquinarias                                      **/
  /****************************************************************************************/
  getMarketCategoriasMaquinarias(idx: any) {
    return this.http.get(`${this.url}/products/${idx}/machineries`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addMarketCategoriaMaquinaria(data: any) {
    return this.http.post(`${this.url}/machineries`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editMarketCategoriaMaquinaria(data: any, idx) {
    return this.http.put(`${this.url}/machineries/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteMarketCategoriaMaquinaria(idx: any) {
    return this.http.delete(`${this.url}/machineries/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                   Mantenimientos                                   **/
  /****************************************************************************************/
  getMarketMantenimientos(idx: any) {
    return this.http.get(`${this.url}/machineries/${idx}/maintenances`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addMarketMantenimientos(data: any) {
    return this.http.post(`${this.url}/maintenances`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editMarketMantenimientos(data: any, idx) {
    return this.http.put(`${this.url}/maintenances/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteMarketMantenimientos(idx: any) {
    return this.http.delete(`${this.url}/maintenances/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                   Operadores                                       **/
  /****************************************************************************************/
  getOperadoresbyMaquinaria(idx: any) {
    return this.http.get(`${this.url}/machineries/${idx}/operators`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addOperadoresbyMaquinaria(data: any) {
    return this.http.post(`${this.url}/operators`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editOperadoresbyMaquinaria(data: any, idx) {
    return this.http.put(`${this.url}/operators/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteOperadoresbyMaquinaria(idx: any) {
    return this.http.delete(`${this.url}/operators/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                   Paquetes                                         **/
  /****************************************************************************************/
  getMarketPaquetes(idx: any) {
    return this.http.get(`${this.url}/markets/${idx}/packages`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addMarketPackage(data: any) {
    return this.http.post(`${this.url}/packages`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editMarketPackage(data: any, idx) {
    return this.http.put(`${this.url}/packages/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteMarketPackage(idx: any) {
    return this.http.delete(`${this.url}/packages/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                             Añadir Productos al Paquete                            **/
  /****************************************************************************************/
  getProductsInPackage(idx: any) {
    return this.http.get(`${this.url}/packages/${idx}/products`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getCategoriasOutThisPackage(idx: any) {
    return this.http.get(`${this.url}/packages/${idx}/without/categories`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getProductosOfCategoria(idx: any) {
    return this.http.get(`${this.url}/categories/${idx}/products`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addProductOfCategoryToPackage(data: any) {
    return this.http.post(`${this.url}/products/packages`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteProductinPackage(idProduct: any, idPackage: any) {
    return this.http.delete(`${this.url}/products/${idProduct}/packages/${idPackage}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                             Recursos Humanos                                       **/
  /****************************************************************************************/

  /****************************************************************************************/
  /**                                     Cargos                                         **/
  /****************************************************************************************/
  getCargosMarket(idx: any) {
    return this.http.get(`${this.url}/markets/${idx}/positions`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error);
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addCargosToMarket(data: any) {
    return this.http.post(`${this.url}/positions`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editCargosToMarket(data: any, idx) {
    return this.http.put(`${this.url}/positions/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteCargoinMarket(idPosition: any) {
    return this.http.delete(`${this.url}/positions/${idPosition}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                     Bonos                                          **/
  /****************************************************************************************/
  getBonosMarket(idx: any) {
    return this.http.get(`${this.url}/markets/${idx}/bonds`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addBonoToMarket(data: any) {
    return this.http.post(`${this.url}/bonds`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editBonosToMarket(data: any, idx) {
    return this.http.put(`${this.url}/bonds/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteBonoinMarket(idBond: any) {
    return this.http.delete(`${this.url}/bonds/${idBond}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                 Capacitaciones                                     **/
  /****************************************************************************************/
  getCapacitacionMarket(idx: any) {
    return this.http.get(`${this.url}/markets/${idx}/trainings`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addCapacitacionToMarket(data: any) {
    return this.http.post(`${this.url}/trainings`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editCapacitacionToMarket(data: any, idx) {
    return this.http.put(`${this.url}/trainings/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteCapacitacioninMarket(idCapacitacion: any) {
    return this.http.delete(`${this.url}/trainings/${idCapacitacion}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                 Datos Maestros                                     **/
  /****************************************************************************************/
  /****************************************************************************************/
  /**                                    Finanzas                                        **/
  /****************************************************************************************/
  getFinanzas(idx: any) {
    return this.http.get(`${this.url}/markets/${idx}/masters/data/finances`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  updateFinanzasMarket(data: any, idx) {
    return this.http.put(`${this.url}/masters/data/finances/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                    Producción                                        **/
  /****************************************************************************************/
  getProduction(idx: any) {
    return this.http.get(`${this.url}/markets/${idx}/masters/data/productions`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  updateProductionMarket(data: any, idx) {
    return this.http.put(`${this.url}/masters/data/productions/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                    Distribuidores                                  **/
  /****************************************************************************************/
  getDistribuidoresMarket(idx: any) {
    return this.http.get(`${this.url}/markets/${idx}/distributors`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addDistribuidor(data: any) {
    return this.http.post(`${this.url}/distributors`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editDistributorMarket(data: any, idx) {
    return this.http.put(`${this.url}/distributors/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  deleteDistributorMarket(idx: any) {
    return this.http.delete(`${this.url}/distributors/${idx}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                    Distribuciones                                   **/
  /****************************************************************************************/
  getDestinosMarket(idx: any) {
    return this.http.get(`${this.url}/distributors/${idx}/distributions`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                    Cobros                                          **/
  /****************************************************************************************/
  getCobros(idx: any) {
    return this.http.get(`${this.url}/markets/${idx}/charges`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  updateCobrosMarket(data: any, idx) {
    return this.http.put(`${this.url}/charges/${idx}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }
  /****************************************************************************************/
  /**                                     Licencias                                      **/
  /****************************************************************************************/
  getLicencias() {
    return this.http.get(`${this.url}/licenses`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getUsuariosporLicencia(license_id) {
    return this.http.get(`${this.url}/licenses/${license_id}/users`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  addLicencia(data: any) {
    return this.http.post(`${this.url}/licenses`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  editLicencia(data: any) {
    return this.http.put(`${this.url}/licenses/${data.license_id}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  delLicencia(license_id: any) {
    return this.http.delete(`${this.url}/licenses/${license_id}`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  /****************************************************************************************/
  /**                                     Usuarios                                       **/
  /****************************************************************************************/

  getUsuarios() {
    return this.http.get(`${this.url}/users`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  getRoles() {
    return this.http.get(`${this.url}/roles`, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  setRol(user_id, licencia_id, data) {
    return this.http.put(`${this.url}/users/${user_id}/licenses/${licencia_id}/rols`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          console.log(error)
          this.errorTime();
          return throwError(error);
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }

  setLevelUser(id_user, data) {
    return this.http.put(`${this.url}/users/${id_user}`, data, this.getToken())
      .pipe(timeout(5000),
        catchError((error, c) => {
          this.errorTime();
          return throwError(error)
        }),
        switchMap(f =>  /*console.log('do something with '+JSON.stringify(f));*/ of(f) ),
        finalize(() => { /*console.log('finilize')*/ }));
  }


  errorTime() {
    this.notification.error('Error Inesperado', 'Lo sentimos, no se ha podido realizar la solicitud, intentelo más tarde');
  }

}
