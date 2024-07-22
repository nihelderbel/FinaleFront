import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMnComponent } from './login-mn.component';

describe('LoginMnComponent', () => {
  let component: LoginMnComponent;
  let fixture: ComponentFixture<LoginMnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
