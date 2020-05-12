import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientosComponent } from './establecimientos.component';

describe('EstablecimientosComponent', () => {
  let component: EstablecimientosComponent;
  let fixture: ComponentFixture<EstablecimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablecimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
