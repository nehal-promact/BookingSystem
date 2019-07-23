import { TestBed } from '@angular/core/testing';

import { SpacesService } from './spaces.service';

describe('SpacesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpacesService = TestBed.get(SpacesService);
    expect(service).toBeTruthy();
  });
});
