import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersAdminComponent implements OnInit {

  loading = true;
  idEstablecimiento = localStorage.getItem('idEstablecimiento');

  teachers = [];
  teachersData =  [];
  userId;

  inputSearch = "";

  constructor(
    private userService: FuncionarioService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getTeachers()
  }

  getTeachers() {
    this.userService.getProfesoresEstablecimiento(this.idEstablecimiento).subscribe((data: any) => {
      this.teachers = data
      this.teachersData = data
      this.loading = false
    }, (error) => {
      if (error.status == 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status == 422) {
        //this.toast.showToast('danger', 'Error en Formulario', 'Por favor revise que sus datos esten bien ingresados');
      }
    });
  }
  search () {
    if (this.inputSearch.length > 0) {
      this.teachers = this.teachersData.filter(e => {
        const term = this.inputSearch.toLowerCase();
        return e.persona_nombre.toLowerCase().includes(term)
          || e.persona_apellido.toString().includes(term)
          || e.persona_email.toString().includes(term)
          || e.persona_rut.toString().includes(term);
      });
    } else {
      this.teachers = this.teachersData
    }
  }

  delete (userId) {
    //this.userId = userId
    this.modalService.confirm({
      nzTitle: '<i>¿Estas seguro de realizar esta acción?</i>',
      nzContent: '<b>Esta acción no se puede deshacer</b>',
      nzCancelText: 'Cancelar',
      nzOkText: 'Eliminar',
      nzClassName: 'modal-confirm-delete',
      nzOnOk: () => this.confirmDelete()
    });
  }

  confirmDelete() {
    this.userService.delete(this.userId).subscribe((data: any) => {
      //this.usersData = data
      this.search()
      this.notification.success('Funcionarios', 'El Funcionario fue eliminado con exito');
    }, (error) => {
      console.log(error);
      if (error.status == 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status == 400 || error.status == 500) {
        this.notification.error('Error al Eliminar el Funcionario', error.error.message);
      }
    });
  }
}
