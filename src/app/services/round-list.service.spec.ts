import { TestBed } from '@angular/core/testing';

import { RoundListService } from './round-list.service';

describe('RoundListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoundListService = TestBed.get(RoundListService);
    expect(service).toBeTruthy();
  });
});
