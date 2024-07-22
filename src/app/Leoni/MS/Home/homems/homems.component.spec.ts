import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemsComponent } from './homems.component';

describe('HomemsComponent', () => {
  let component: HomemsComponent;
  let fixture: ComponentFixture<HomemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
