import { TestBed } from '@angular/core/testing';

import { BmwService } from './bmw.service';

describe('BmwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BmwService = TestBed.get(BmwService);
    expect(service).toBeTruthy();
  });
});
