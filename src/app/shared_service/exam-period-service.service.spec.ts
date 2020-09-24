import { TestBed } from '@angular/core/testing';

import { ExamPeriodServiceService } from './exam-period-service.service';

describe('ExamPeriodServiceService', () => {
  let service: ExamPeriodServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamPeriodServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
