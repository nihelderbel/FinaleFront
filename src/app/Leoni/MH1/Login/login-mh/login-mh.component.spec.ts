import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMHComponent } from './login-mh.component';

describe('LoginMHComponent', () => {
  let component: LoginMHComponent;
  let fixture: ComponentFixture<LoginMHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
