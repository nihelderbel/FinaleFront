import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsAMComponent } from './patients-am.component';

describe('PatientsAMComponent', () => {
  let component: PatientsAMComponent;
  let fixture: ComponentFixture<PatientsAMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsAMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
