import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousAMComponent } from './rendez-vous-am.component';

describe('RendezVousAMComponent', () => {
  let component: RendezVousAMComponent;
  let fixture: ComponentFixture<RendezVousAMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendezVousAMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezVousAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
