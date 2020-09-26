import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamInformationFormComponent } from './exam-information-form.component';

describe('ExamInformationFormComponent', () => {
  let component: ExamInformationFormComponent;
  let fixture: ComponentFixture<ExamInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamInformationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
