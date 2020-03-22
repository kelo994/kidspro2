import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss']
})
export class AsignaturasComponent implements OnInit {
  private parametersObservable: any;

  asignaturas = {
    asign1: ['Lenguaje'],
    asign2: ['Matemática'],
    asign3: ['Inglés'],
    asign4: ['Ciencia'],
  }

  selectAsginatura = '';

  constructor(private routeActive: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.parametersObservable = this.routeActive.params.subscribe(params => {
      console.log(params);
      if (this.routeActive.snapshot.params.idCurso == '1') {
        this.selectAsginatura = this.asignaturas.asign1[0];
      } else if (this.routeActive.snapshot.params.idCurso == '2') {
        this.selectAsginatura = this.asignaturas.asign2[0];
      } else if (this.routeActive.snapshot.params.idCurso == '3') {
        this.selectAsginatura = this.asignaturas.asign3[0];
      } else if (this.routeActive.snapshot.params.idCurso == '4') {
        this.selectAsginatura = this.asignaturas.asign4[0];
      }
    });
  }

  destruir() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.selectAsginatura = '';
    this.parametersObservable.unsubscribe();
  }

}
