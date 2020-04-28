import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {SkillService} from '../../../../services/system/skill.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  loading = true;
  skills: [
      {
        habilidad_nombre: '',
        habilidad_id: ''
      }
      ];
  modalAgregarHabilidades = false;
  hablidadForm  = new FormGroup({
    habilidad_nombre: new FormControl(''),
  });
  habilidadElminada;
  unitId;

  constructor(
      private router: Router,
      private location: Location,
      private route: ActivatedRoute,
      private skillService: SkillService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.unitId = params.unit;
    });
    this.getSkillsPerSubject();
  }

  getSkillsPerSubject() {
    this.skillService.getSkillsPerUnits(this.unitId).subscribe((data: any) => {
      this.skills = data;
      this.loading = false;
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400) {
        this.router.navigate(['/auth/login']);
        this.notification.error('Error Inesperado', 'Por favor vuelve a iniciar Sesión');
      }
    });
  }

  showModal(): void {
    this.modalAgregarHabilidades = true;
  }

  handleCancelAgregar(): void {
    this.modalAgregarHabilidades = false;
  }

  createUnit() {
    const data = this.hablidadForm.value;
    data.unidad_id = this.unitId;
    this.skillService.save(data).subscribe((response: any) => {
      this.skills = response;
      this.modalAgregarHabilidades = false;
      this.notification.success('Objetivo', 'Objetivo Creado con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  delete(objetivoId) {
    this.habilidadElminada = objetivoId;
    this.modalService.confirm({
      nzTitle: '<i>¿Estás seguro de realizar esta acción?</i>',
      nzContent: '<b>Esta acción no se puede deshacer</b>',
      nzCancelText: 'Cancelar',
      nzOkText: 'Eliminar',
      nzClassName: 'modal-confirm-delete',
      nzOnOk: () => this.confirmDelete()
    });
  }

  confirmDelete() {
    this.skillService.delete(this.habilidadElminada).subscribe((data: any) => {
      this.skills = data;
      this.notification.success('Objetivos', 'El objetivo fue eliminado con exito');
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al Eliminar el Objetivo', error.error.message);
      }
    });
  }
  goToBlocks(unidadId) {
    this.router.navigateByUrl('system/pages/subjects/units/' + unidadId + '/blocks' );
  }
  goBack() {
    this.location.back();
  }
}
