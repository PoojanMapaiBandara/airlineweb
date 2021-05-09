
import { TestBed } from '@angular/core/testing';

import { userService } from '../user/user-service';

describe('TutorialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: userService = TestBed.get(userService);
    expect(service).toBeTruthy();
  });
});
