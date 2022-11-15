import { TestBed } from '@angular/core/testing';

import { OpenedBoardGuard } from './opened-board.guard';

describe('OpenedBoardGuard', () => {
  let guard: OpenedBoardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OpenedBoardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
