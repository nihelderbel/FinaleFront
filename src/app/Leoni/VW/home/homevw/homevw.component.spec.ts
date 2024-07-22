import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomevwComponent } from './homevw.component';

describe('HomevwComponent', () => {
  let component: HomevwComponent;
  let fixture: ComponentFixture<HomevwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomevwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomevwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
