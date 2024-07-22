import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPcdaComponent } from './edit-pcda.component';

describe('EditPcdaComponent', () => {
  let component: EditPcdaComponent;
  let fixture: ComponentFixture<EditPcdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPcdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPcdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
