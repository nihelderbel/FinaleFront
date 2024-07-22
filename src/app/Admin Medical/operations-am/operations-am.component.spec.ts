import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsAMComponent } from './operations-am.component';

describe('OperationsAMComponent', () => {
  let component: OperationsAMComponent;
  let fixture: ComponentFixture<OperationsAMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsAMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
