import { TestBed } from '@angular/core/testing';

import { FilterTasksService } from './filter-tasks.service';

describe('FilterTasksService', () => {
  let service: FilterTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
