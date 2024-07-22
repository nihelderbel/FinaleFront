import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Homemh2Component } from './homemh2.component';

describe('Homemh2Component', () => {
  let component: Homemh2Component;
  let fixture: ComponentFixture<Homemh2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Homemh2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Homemh2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
