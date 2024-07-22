import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinsAMComponent } from './medecins-am.component';

describe('MedecinsAMComponent', () => {
  let component: MedecinsAMComponent;
  let fixture: ComponentFixture<MedecinsAMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinsAMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinsAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
