import { TestBed } from '@angular/core/testing';

import { GoodsTransferService } from './goods-transfer.service';

describe('GoodsTransferService', () => {
  let service: GoodsTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
