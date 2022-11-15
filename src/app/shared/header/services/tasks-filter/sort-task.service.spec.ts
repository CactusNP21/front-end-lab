import { TestBed } from '@angular/core/testing';

import { SortTaskService } from './sort-task.service';

describe('SortTaskService', () => {
  let service: SortTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
