import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVWComponent } from './login-vw.component';

describe('LoginVWComponent', () => {
  let component: LoginVWComponent;
  let fixture: ComponentFixture<LoginVWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginVWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginVWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
