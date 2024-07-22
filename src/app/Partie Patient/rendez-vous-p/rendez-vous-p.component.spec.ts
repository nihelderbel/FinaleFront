import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousPComponent } from './rendez-vous-p.component';

describe('RendezVousPComponent', () => {
  let component: RendezVousPComponent;
  let fixture: ComponentFixture<RendezVousPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendezVousPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezVousPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
