import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';
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

  inputSearch = "";

  constructor(
    private userService: FuncionarioService,
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
          || e.persona_email.toString().includes(term);
          //|| e.persona_rut.toString().includes(term)
      });
    } else {
      this.teachers = this.teachersData
    }
  }
}
