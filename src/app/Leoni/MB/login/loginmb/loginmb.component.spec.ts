import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmbComponent } from './loginmb.component';

describe('LoginmbComponent', () => {
  let component: LoginmbComponent;
  let fixture: ComponentFixture<LoginmbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginmbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
