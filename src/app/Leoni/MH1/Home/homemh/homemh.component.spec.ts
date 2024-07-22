import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemhComponent } from './homemh.component';

describe('HomemhComponent', () => {
  let component: HomemhComponent;
  let fixture: ComponentFixture<HomemhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
