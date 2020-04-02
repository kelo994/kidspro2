import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityMobileComponent } from './unity-mobile.component';

describe('UnityMobileComponent', () => {
  let component: UnityMobileComponent;
  let fixture: ComponentFixture<UnityMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnityMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
