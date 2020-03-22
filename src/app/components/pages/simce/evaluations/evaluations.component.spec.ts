import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimceEvaluationsComponent } from './evaluations.component';

describe('SimceComponent', () => {
  let component: SimceEvaluationsComponent;
  let fixture: ComponentFixture<SimceEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimceEvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimceEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
