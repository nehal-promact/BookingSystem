import { TestBed } from '@angular/core/testing';

import { MonthViewService } from './month-view.service';

describe('MonthViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonthViewService = TestBed.get(MonthViewService);
    expect(service).toBeTruthy();
  });
});
