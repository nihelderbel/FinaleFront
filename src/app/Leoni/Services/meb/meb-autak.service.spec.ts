import { TestBed } from '@angular/core/testing';

import { MEBAutakService } from './meb-autak.service';

describe('MEBAutakService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MEBAutakService = TestBed.get(MEBAutakService);
    expect(service).toBeTruthy();
  });
});
