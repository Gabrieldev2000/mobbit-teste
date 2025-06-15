import { TestBed } from '@angular/core/testing';

import { Fatura } from './fatura';

describe('Fatura', () => {
  let service: Fatura;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fatura);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
