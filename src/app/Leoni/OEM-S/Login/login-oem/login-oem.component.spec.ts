import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOEMComponent } from './login-oem.component';

describe('LoginOEMComponent', () => {
  let component: LoginOEMComponent;
  let fixture: ComponentFixture<LoginOEMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOEMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOEMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
