import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMebComponent } from './login-meb.component';

describe('LoginMebComponent', () => {
  let component: LoginMebComponent;
  let fixture: ComponentFixture<LoginMebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
