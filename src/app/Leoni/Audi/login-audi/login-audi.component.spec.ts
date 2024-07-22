import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAudiComponent } from './login-audi.component';

describe('LoginAudiComponent', () => {
  let component: LoginAudiComponent;
  let fixture: ComponentFixture<LoginAudiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAudiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAudiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
