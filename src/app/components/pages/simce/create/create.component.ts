import { Component, OnInit, } from '@angular/core';
import { SimceService } from '../../../../services/simce.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-simce-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class SimceCreateComponent implements OnInit {
  createForm: FormGroup;

  modalCreate = false;
  createIcon = "plus";

  idFuncionario;
  idAsignatura;
  idCurso;

  simceTypes = [];
  simceSelected;
  cursos = [];
  cursoSelected;

  evaluacion;

  notasMinimas = [1, 2]
  value = 50;

  constructor(public simceService: SimceService, public router: Router)
  {
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
    //this.getSimceTypes()
  }

  getSimceTypes() {
    this.simceService.getSimce().subscribe( (data: any) => { // Success
      this.simceTypes = data;
      this.simceSelected = this.simceTypes[0];
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login']);
    })
  }

  createEvaluation () {
    let data = {
      simce_id: this.createForm.controls.tipo.value,
      curso_especifico_id: this.createForm.controls.curso.value,
      exigencia: this.createForm.controls.exigencia.value,
      nota_minima: this.createForm.controls.nota_minima.value
    }
    this.simceService.agregarPrueba(data).subscribe( (data: any) => { // Success
      this.evaluacion = data
    },(error) => {
      console.log(error.response)
      if (error.status == 401) this.router.navigate(['/auth/login'])
    })
  }

  changeTypeSIMCE(simce: any) {
    this.cursos = [];
    this.simceService.getCursosFuncionarioAsignatura(this.idFuncionario, simce.asignatura_id).subscribe( (data: any) => { // Success
      this.cursos = data
      if (this.cursos.length === 0) {
        //this.toast.showToast('danger', 'Error', 'No posee cursos que cumplan las condiciones del SIMCE seleccionado.');
      }
    },(error) => {
      if (error.status == 401) this.router.navigate(['/auth/login'])
    })

    this.createForm.controls['curso'].setValue('');
  }

  clean () {
    this.cursos = [];
    this.createForm.controls['tipo'].setValue('');
    this.createForm.controls['curso'].setValue('');
  }

  verPrueba (element) {
    //this.modalService.dismissAll();
    this.router.navigate(['/pages/simce/prueba'], {state: {idPrueba: element.prueba_id, simce: element}})
  }

  setValue(newValue) {
    this.value = Math.min(Math.max(newValue, 0), 100)
  }

  openModal (modal) {
    if (modal === 'create') {
      this.modalCreate = true
    }
  }

  closeModal (modal) {
    if (modal === 'create') {
      this.modalCreate = false
    }
  }

}