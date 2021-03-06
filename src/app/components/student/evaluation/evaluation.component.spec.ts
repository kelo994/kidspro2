import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEvaluationComponent } from './evaluation.component';

describe('StudentEvaluationComponent', () => {
  let component: StudentEvaluationComponent;
  let fixture: ComponentFixture<StudentEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
