import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ObjectiveService} from '../../../../services/system/Objective.service';

@Component({
  selector: 'app-linkobjetives',
  templateUrl: './linkobjetives.component.html',
  styleUrls: ['./linkobjetives.component.scss']
})
export class LinkobjetivesComponent implements OnInit {
  loading;
  blockId;
  objectivesBlocks;
  objectivesMissingBlocks;
  subjectId;
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private objectiveService: ObjectiveService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.blockId = params.block;
      this.subjectId = localStorage.getItem('subjectId');
    });
    this.getObjetivesPerBlocks();
    this.getObjetivesMissing();
  }

  getObjetivesPerBlocks() {
    this.objectiveService.getObjetivesPerBlocks(this.blockId).subscribe((data: any) => {
      this.objectivesBlocks = data;
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

  getObjetivesMissing() {
    this.objectiveService.getObjetivesMissing(this.blockId, this.subjectId).subscribe((data: any) => {
      this.objectivesMissingBlocks = data;
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

  addObjective(objectiveId) {
    const data = {
      objetivo_id: objectiveId,
      bloque_id: this.blockId
    };
    console.log(data);
    this.objectiveService.saveBlocksObjetives(data).subscribe((response: any) => {
      this.getObjetivesPerBlocks();
      this.getObjetivesMissing();
      this.notification.success('Objetivo', 'Objetivo agregado con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  quitarObjetivo(objectiveId) {
    this.objectiveService.deleteBlockObjetive(this.blockId, objectiveId).subscribe((data: any) => {
      this.getObjetivesPerBlocks();
      this.getObjetivesMissing();
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

}
