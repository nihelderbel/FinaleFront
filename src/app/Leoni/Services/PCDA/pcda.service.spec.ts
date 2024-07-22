import { TestBed } from '@angular/core/testing';

import { PcdaService } from './pcda.service';

describe('PcdaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PcdaService = TestBed.get(PcdaService);
    expect(service).toBeTruthy();
  });
});
