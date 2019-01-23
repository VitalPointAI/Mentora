import { TestBed } from '@angular/core/testing';

import { ThreeBox } from './3box.service';

describe('ThreeBox', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThreeBox = TestBed.get(ThreeBox);
    expect(service).toBeTruthy();
  });
});
