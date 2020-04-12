import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttitudesComponent } from './attitudes.component';

describe('AttitudesComponent', () => {
  let component: AttitudesComponent;
  let fixture: ComponentFixture<AttitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
