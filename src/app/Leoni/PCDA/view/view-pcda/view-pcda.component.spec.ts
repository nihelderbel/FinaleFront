import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPcdaComponent } from './view-pcda.component';

describe('ViewPcdaComponent', () => {
  let component: ViewPcdaComponent;
  let fixture: ComponentFixture<ViewPcdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPcdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPcdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
