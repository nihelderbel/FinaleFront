import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAMComponent } from './profile-am.component';

describe('ProfileAMComponent', () => {
  let component: ProfileAMComponent;
  let fixture: ComponentFixture<ProfileAMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
