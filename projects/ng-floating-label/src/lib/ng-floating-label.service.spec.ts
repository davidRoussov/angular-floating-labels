import { TestBed } from '@angular/core/testing';

import { NgFloatingLabelService } from './ng-floating-label.service';

describe('NgFloatingLabelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgFloatingLabelService = TestBed.get(NgFloatingLabelService);
    expect(service).toBeTruthy();
  });
});
