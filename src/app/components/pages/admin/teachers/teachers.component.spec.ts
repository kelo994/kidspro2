import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersAdminComponent } from './teachers.component';

describe('TeachersAdminComponent', () => {
  let component: TeachersAdminComponent;
  let fixture: ComponentFixture<TeachersAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
