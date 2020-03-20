import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimceComponent } from './simce.component';

describe('SimceComponent', () => {
  let component: SimceComponent;
  let fixture: ComponentFixture<SimceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
