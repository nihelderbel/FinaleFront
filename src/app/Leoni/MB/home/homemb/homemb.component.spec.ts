import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomembComponent } from './homemb.component';

describe('HomembComponent', () => {
  let component: HomembComponent;
  let fixture: ComponentFixture<HomembComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomembComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomembComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
