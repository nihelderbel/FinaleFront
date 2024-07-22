import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementsAMComponent } from './departements-am.component';

describe('DepartementsAMComponent', () => {
  let component: DepartementsAMComponent;
  let fixture: ComponentFixture<DepartementsAMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartementsAMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartementsAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
