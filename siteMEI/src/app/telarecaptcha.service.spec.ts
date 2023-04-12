import { TestBed } from '@angular/core/testing';

import { TelarecaptchaService } from './telarecaptcha.service';

describe('TelarecaptchaService', () => {
  let service: TelarecaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelarecaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});