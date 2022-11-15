import { TestBed } from '@angular/core/testing';

import { AuthenticatedResolver } from './authenticated.resolver';

describe('AuthenticatedResolver', () => {
  let resolver: AuthenticatedResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthenticatedResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
