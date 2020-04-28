import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {BlockService} from '../../../../services/system/block.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  loading = true;
  blocks: [
      {
        bloque_id: '',
        bloque_titulo: '',
        bloque_estado: '',
        bloque_imagen: '',
        bloque_orden: '',
        bloque_cantidad_ejercicios: '',
        estado_juego: ''
      }
   ];
  modalAgregarBloque = false;
  blockForm  = new FormGroup({
    bloque_titulo: new FormControl(''),
    bloque_estado: new FormControl(''),
    bloque_imagen: new FormControl(''),
    bloque_orden: new FormControl(''),
    bloque_cantidad_ejercicios: new FormControl(''),
    estado_juego: new FormControl(''),
  });
  bloqueElminado;
  unitId;

  constructor(
      private router: Router,
      private location: Location,
      private route: ActivatedRoute,
      private blockService: BlockService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.unitId = params.unit;
    });
    this.getBlocksPerUnit();
  }

  getBlocksPerUnit() {
    this.blockService.getBlocksPerUnit(this.unitId).subscribe((data: any) => {
      this.blocks = data;
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
    this.modalAgregarBloque = true;
  }

  handleCancelAgregar(): void {
    this.modalAgregarBloque = false;
  }

  createBlock() {
    const data = this.blockForm.value;
    data.unidad_id = this.unitId;
    console.log(data);
    this.blockService.save(data).subscribe((response: any) => {
      this.blocks = response;
      this.modalAgregarBloque = false;
      this.notification.success('Bloque', 'Bloque Creado con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  delete(bloqueId) {
    this.bloqueElminado = bloqueId;
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
    this.blockService.delete(this.bloqueElminado).subscribe((data: any) => {
      this.blocks = data;
      this.notification.success('bloque', 'El bloque fue eliminado con exito');
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al Eliminar el bloque', error.error.message);
      }
    });
  }
  goToBlocks(unidadId) {
    this.router.navigateByUrl('system/pages/subjects/units/' + unidadId + '/blocks' );
  }

  goToLinkObjective(blockId) {
    this.router.navigateByUrl('system/pages/subjects/units/blocks/' + blockId + '/objectives' );
  }

  goToLinkRepository(blockId) {
    this.router.navigateByUrl('system/pages/subjects/units/blocks/' + blockId + '/repositories' );
  }

  goBack() {
    this.location.back();
  }
}
