import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemebComponent } from './homemeb.component';

describe('HomemebComponent', () => {
  let component: HomemebComponent;
  let fixture: ComponentFixture<HomemebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
