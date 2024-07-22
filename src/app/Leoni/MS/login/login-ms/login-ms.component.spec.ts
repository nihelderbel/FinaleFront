import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMsComponent } from './login-ms.component';

describe('LoginMsComponent', () => {
  let component: LoginMsComponent;
  let fixture: ComponentFixture<LoginMsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
