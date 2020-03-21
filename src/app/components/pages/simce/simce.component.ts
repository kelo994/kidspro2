import { Component, OnInit } from '@angular/core';
import { SimceService } from '../../../services/simce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simce',
  templateUrl: './simce.component.html',
  styleUrls: ['./simce.component.scss']
})
export class SimceComponent implements OnInit {

  constructor(public simceService: SimceService,  public router: Router) { }

  idFuncionario;
  idAsignatura;
  idCurso;

  pruebas = []
  pruebasFinalizadas = [
  ];

  ngOnInit(): void {
    this.idFuncionario = localStorage.getItem('idFuncionario')
    this.idCurso = localStorage.getItem('CursoId')
    this.idAsignatura = localStorage.getItem('asignatureOpen')
    this.getPruebasFuncionario()
    this.getPruebasFinalizadasFuncionario()
  }

  getPruebasFuncionario() {
    this.simceService.getPruebasFuncionario(this.idFuncionario).subscribe((data: any) => { // Success
      this.pruebas = data;
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login']);
    })
  }

  getPruebasFinalizadasFuncionario() {
    this.simceService.getPruebasFinalizadasFuncionario(this.idFuncionario).subscribe( (data: any) => { // Success
      this.pruebasFinalizadas = data.pruebas;
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login']);
    })
  }

  actualizarEstadoPrueba() {
    /*this.simceService.actualizarEstadoPrueba(this.prueba.prueba_id, this.prueba.estado_id).subscribe((data: any) => { // Success
      this.prueba.estado_id = data.estado
      this.modalService.dismissAll();
      this.toast.showToast('success', data.titulo, data.mensaje)
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login'])
      if (error.status = 500) this.toast.showToast('danger', error.error.titulo, error.error.mensaje);
    })*/
  }

  obtenerCodigo(curso_especifico_id) {
    /*this.simceService.obtenerCodigo(curso_especifico_id).subscribe((data: any) => { // Success
      this.codigo = data;
      this.modalService.open(this.modalCode, {
        backdropClass: 'light-blue-backdrop',
        windowClass: 'animated fadeInDown', centered: true, scrollable: true
      })
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login'])
    })*/
  }

}
