import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SimceService } from '../../../../services/simce.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-simce-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class SimceCreateComponent implements OnInit {

  @Output() newEvaluation = new EventEmitter();

  createForm: FormGroup;

  modalCreate = false;
  modalEvaluationDetail = false;
  createIcon = "plus";

  idFuncionario;
  idAsignatura;
  idCurso;

  simceTypes = [];
  cursos = [];

  evaluation;

  notasMinimas = [1, 2]
  value = 50;

  marks: NzMarks = {
    0: '0',
    50: '50',
    100: '100'
  };

  constructor(
    public simceService: SimceService,
    private notification: NzNotificationService,
    public router: Router
  ) {
    this.createForm = new FormGroup({
      'tipo': new FormControl('', [Validators.required]),
      'curso': new FormControl('', [Validators.required]),
      'nota_minima': new FormControl(1, [Validators.required]),
      'exigencia': new FormControl(50, [Validators.required])
    })
  }

  ngOnInit() {
    this.idFuncionario = localStorage.getItem('idFuncionario');
    this.idCurso = localStorage.getItem('CursoId');
    this.idAsignatura = localStorage.getItem('asignatureOpen');
    this.getSimceTypes()
  }

  getSimceTypes() {
    this.simceService.getSimce().subscribe( (data: any) => { // Success
      this.simceTypes = data;
      if (this.simceTypes.length) {
        //this.createForm.controls['tipo'].setValue(this.simceTypes[0]);
        //this.getValidCourses()
      }
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login']);
    })
  }

  createEvaluation () {
    this.closeModal('create')
    this.notification.info('Generar Evaluación', 'Estamos procesando su solicitud')
    let data = {
      simce_id: this.createForm.controls.tipo.value.simce_id,
      curso_especifico_id: this.createForm.controls.curso.value,
      exigencia: this.createForm.controls.exigencia.value,
      nota_minima: this.createForm.controls.nota_minima.value
    }
    this.simceService.agregarPrueba(data).subscribe( (data: any) => {
      this.evaluation = data
      this.newEvaluation.emit(data);
      this.openModal('detail')
    },(error) => {
      console.log(error.response)
      this.notification.error('Error Inesperado', 'Ha ocurrido un error al generar la evaluación')
      if (error.status == 401) this.router.navigate(['/auth/login'])
    })
  }

  getValidCourses () {
    let asignaturaId = this.createForm.controls.tipo.value.asignatura_id;
    if (asignaturaId != 0) {
      this.cursos = [];
      this.simceService.getCursosFuncionarioAsignatura(this.idFuncionario, asignaturaId).subscribe( (data: any) => { // Success
        this.cursos = data
        if (this.cursos.length === 0) {
          this.notification.error('Error', 'No posee cursos que cumplan las condiciones del SIMCE seleccionado');
        }
      },(error) => {
        if (error.status == 401) this.router.navigate(['/auth/login'])
      })
    }

    this.createForm.controls['curso'].setValue('');
  }

  clean () {
    this.cursos = [];
    this.createForm.controls['tipo'].setValue('');
    this.createForm.controls['curso'].setValue('');
  }

  verPrueba (element) {
    this.router.navigate(['/pages/simce/prueba'], {state: {idPrueba: element.prueba_id, simce: element}})
  }

  setValue(newValue) {
    this.value = Math.min(Math.max(newValue, 0), 100)
  }

  openModal (modal) {
    if (modal === 'create') {
      this.modalCreate = true
    }
    if (modal === 'detail') {
      this.modalEvaluationDetail = true
    }
  }

  closeModal (modal) {
    if (modal === 'create') {
      this.modalCreate = false
    }
    if (modal === 'detail') {
      this.modalEvaluationDetail = false
    }
  }

  setMarks () {
    let value = this.createForm.controls.exigencia.value;
    let marks: NzMarks = {
      
    }
    marks[value] = value;
    if (value <= 5) {
      marks['50'] = 50;
      marks['100'] = 100;
    } else if (value >= 95) {
      marks['0'] = 0;
      marks['50'] = 50;
    } else if (value >= 45 && value <= 55) {
      marks['0'] = 0;
      marks['100'] = 100;
    } else {
      marks['0'] = 0;
      marks['50'] = 50;
      marks['100'] = 100;
    }
    this.marks = marks
  }

}