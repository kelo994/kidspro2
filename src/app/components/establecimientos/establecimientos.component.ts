import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';
import {FuncionarioService} from '../../services/funcionario.service';

@Component({
  selector: 'app-establecimientos',
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.scss']
})
export class EstablecimientosComponent implements OnInit {
  establecimientos: [];
  user = {
    genero: '',
    id: '',
    persona_apellido: '',
    persona_avatar: '',
    persona_direccion: '',
    persona_email: '',
    persona_nombre: '',
    persona_rut: '',
    persona_telefono: '',
  };
  funcionarioId;

  constructor(public router: Router,
              private notification: NzNotificationService,
              public funcionarioService: FuncionarioService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.funcionarioId = localStorage.getItem('idFuncionario');
    this.getEstablecimientosFuncionario();
  }

  getEstablecimientosFuncionario() {
    this.funcionarioService.getEstablecimientosFuncionario().subscribe((data: any) => {
      this.establecimientos = data.establecimientos;
      console.log(this.establecimientos);
    }, (error) => {
      if (error.status === 500) { this.notification.error('Error', error.error); }
      if (error.status === 401) {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      }
    });
  }


  openCollege(establecimiento) {
    localStorage.setItem('establecimiento', JSON.stringify(establecimiento));
    localStorage.setItem('idEstablecimiento', establecimiento.id);
    this.getRoles(establecimiento.id);
  }


  getRoles(establecimientoId) {
    this.funcionarioService.getRolesFuncionario(this.funcionarioId, establecimientoId).subscribe((data: any) => {
      localStorage.setItem('rolId', data[0].id);
      localStorage.setItem('roles', JSON.stringify(data));
      console.log(data[0].id);
      this.router.navigate(['/pages/curso/0']);
    }, (error) => {
      if (error.status === 500) { this.notification.error('Error', error.error); }
      if (error.status === 401) {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
