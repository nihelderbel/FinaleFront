import { TestBed } from '@angular/core/testing';

import { Mh2Service } from './mh2.service';

describe('Mh2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Mh2Service = TestBed.get(Mh2Service);
    expect(service).toBeTruthy();
  });
});
