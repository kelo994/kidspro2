import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimceEvaluationComponent } from './evaluation.component';

describe('SimceEvaluationComponent', () => {
  let component: SimceEvaluationComponent;
  let fixture: ComponentFixture<SimceEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimceEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
