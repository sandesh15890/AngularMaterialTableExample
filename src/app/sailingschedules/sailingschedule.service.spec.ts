import { TestBed } from '@angular/core/testing';

import { SailingscheduleService } from './sailingschedule.service';

describe('SailingscheduleService', () => {
  let service: SailingscheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SailingscheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
