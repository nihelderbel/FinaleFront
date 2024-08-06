import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeomesComponent } from './homeomes.component';

describe('HomeomesComponent', () => {
  let component: HomeomesComponent;
  let fixture: ComponentFixture<HomeomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
