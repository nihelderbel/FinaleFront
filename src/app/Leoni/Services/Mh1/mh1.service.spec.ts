import { TestBed } from '@angular/core/testing';

import { Mh1Service } from './mh1.service';

describe('Mh1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Mh1Service = TestBed.get(Mh1Service);
    expect(service).toBeTruthy();
  });
});
