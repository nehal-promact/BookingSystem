import { TestBed } from '@angular/core/testing';

import { DayViewService } from './day-view.service';

describe('DayViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayViewService = TestBed.get(DayViewService);
    expect(service).toBeTruthy();
  });
});
