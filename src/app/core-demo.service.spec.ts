import { TestBed } from '@angular/core/testing';

import { CoreDemoService } from './core-demo.service';

describe('CoreDemoService', () => {
  let service: CoreDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
