import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebmwComponent } from './homebmw.component';

describe('HomebmwComponent', () => {
  let component: HomebmwComponent;
  let fixture: ComponentFixture<HomebmwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebmwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebmwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
