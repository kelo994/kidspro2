import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkobjetivesComponent } from './linkobjetives.component';

describe('LinkobjetivesComponent', () => {
  let component: LinkobjetivesComponent;
  let fixture: ComponentFixture<LinkobjetivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkobjetivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkobjetivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
