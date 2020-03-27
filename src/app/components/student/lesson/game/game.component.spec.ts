import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLessonGameComponent } from './game.component';

describe('StudentLessonGameComponent', () => {
  let component: StudentLessonGameComponent;
  let fixture: ComponentFixture<StudentLessonGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLessonGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLessonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
