import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeaudiComponent } from './homeaudi.component';

describe('HomeaudiComponent', () => {
  let component: HomeaudiComponent;
  let fixture: ComponentFixture<HomeaudiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeaudiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeaudiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
