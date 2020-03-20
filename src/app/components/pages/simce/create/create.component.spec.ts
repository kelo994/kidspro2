import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimceCreateComponent } from './create.component';

describe('SimceCreateComponent', () => {
  let component: SimceCreateComponent;
  let fixture: ComponentFixture<SimceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
