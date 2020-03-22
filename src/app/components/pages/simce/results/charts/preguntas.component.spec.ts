import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasChartComponent } from './preguntas.component';

describe('SimceComponent', () => {
  let component: PreguntasChartComponent;
  let fixture: ComponentFixture<PreguntasChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntasChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
