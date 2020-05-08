import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isDrawer: boolean;
  @Output() newSystemChange = new EventEmitter();

  constructor(private router: Router, private notification: NzNotificationService) { }

  isCollapsed = false;
  siglas;
  userName = localStorage.getItem('nombreCompleto');

  roles = JSON.parse(localStorage.getItem('roles'));
  establecimientos;
  cantidadEstablecimientos;
  cantidadRoles;

  rolId = parseInt(localStorage.getItem('rolId'));
  establecimientoId = parseInt(localStorage.getItem('idEstablecimiento'));

  modalRoles = false;
  modalEstablecimientos = false;

  ngOnInit(): void {
    this.siglas = this.getFirstCharacter(this.userName);
    this.cantidadEstablecimientos = JSON.parse(localStorage.getItem('establecimientos')).length;
    this.cantidadRoles = JSON.parse(localStorage.getItem('roles')).length;
    console.log(this.cantidadEstablecimientos);

  }

  collapseMenu() {
    $('#btnCollapse').click();
    this.isCollapsed = !this.isCollapsed;
  }

  getFirstCharacter (string) {
    let str = string.split(" ");
    return str[0].charAt(0) + str[1].charAt(0);
  }

  logout () {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  openModal (type) {
    if (type === 'roles') {
      this.modalRoles = true
    }
    if (type === 'establecimientos') {
      this.modalEstablecimientos = true
    }
  }

  closeModal (type) {
    if (type === 'roles') {
      this.modalRoles = false
    }
    if (type === 'establecimientos') {
      this.modalEstablecimientos = false
    }
  }

  cambiarRol () {
    localStorage.setItem('rolId', this.rolId.toString());
    this.closeModal('roles');
    this.notification.success('Su rol ha sido cambiado', '');
    this.newSystemChange.emit(this.rolId);
  }

  cambiarEstablecimiento() {
    localStorage.removeItem('roles');
    localStorage.removeItem('rolId');
    this.router.navigate(['establecimientos']);
  }

}
