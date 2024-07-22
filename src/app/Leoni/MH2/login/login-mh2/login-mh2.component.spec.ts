import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMH2Component } from './login-mh2.component';

describe('LoginMH2Component', () => {
  let component: LoginMH2Component;
  let fixture: ComponentFixture<LoginMH2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMH2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMH2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
