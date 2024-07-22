import { TestBed } from '@angular/core/testing';

import { MbService } from './mb.service';

describe('MbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MbService = TestBed.get(MbService);
    expect(service).toBeTruthy();
  });
});
