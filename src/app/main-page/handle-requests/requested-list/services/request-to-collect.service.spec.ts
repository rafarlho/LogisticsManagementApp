import { TestBed } from '@angular/core/testing';

import { RequestToCollectService } from './request-to-collect.service';

describe('RequestToCollectService', () => {
  let service: RequestToCollectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestToCollectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
