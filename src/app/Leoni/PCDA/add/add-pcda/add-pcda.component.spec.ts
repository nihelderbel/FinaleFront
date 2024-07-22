import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPcdaComponent } from './add-pcda.component';

describe('AddPcdaComponent', () => {
  let component: AddPcdaComponent;
  let fixture: ComponentFixture<AddPcdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPcdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPcdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
