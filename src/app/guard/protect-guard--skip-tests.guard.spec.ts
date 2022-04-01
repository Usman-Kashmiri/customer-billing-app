import { TestBed } from '@angular/core/testing';

import { ProtectGuardSkipTestsGuard } from './protect-guard--skip-tests.guard';

describe('ProtectGuardSkipTestsGuard', () => {
  let guard: ProtectGuardSkipTestsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectGuardSkipTestsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
