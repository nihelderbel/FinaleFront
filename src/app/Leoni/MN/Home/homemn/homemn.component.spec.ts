import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemnComponent } from './homemn.component';

describe('HomemnComponent', () => {
  let component: HomemnComponent;
  let fixture: ComponentFixture<HomemnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
