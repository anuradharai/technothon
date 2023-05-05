import { TestBed } from '@angular/core/testing';

import { CountryUniversityService } from './country-university.service';

describe('CountryUniversityService', () => {
  let service: CountryUniversityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryUniversityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
