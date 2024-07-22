import { TestBed } from '@angular/core/testing';

import { VwService } from './vw.service';

describe('VwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VwService = TestBed.get(VwService);
    expect(service).toBeTruthy();
  });
});
