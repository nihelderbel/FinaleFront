import { TestBed } from '@angular/core/testing';

import { OemsService } from './oems.service';

describe('OemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OemsService = TestBed.get(OemsService);
    expect(service).toBeTruthy();
  });
});
