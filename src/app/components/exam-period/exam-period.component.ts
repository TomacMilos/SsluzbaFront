import { Component, OnInit } from '@angular/core';
import {ExamPeriod} from '../../classes/exam-period';
import {ExamPeriodServiceService} from '../../shared_service/exam-period-service.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exam-period',
  templateUrl: './exam-period.component.html',
  styleUrls: ['./exam-period.component.css']
})
export class ExamPeriodComponent implements OnInit {

  public examperiods: ExamPeriod[];
  subscription: Subscription

  constructor(private _examPeriodSevice: ExamPeriodServiceService, private _router: Router) {
    this.subscription = _examPeriodSevice.RegenerateData$.subscribe(() =>
    this.getExamPeriods()
    )}

  ngOnInit(): void {

    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }

    this.getExamPeriods();
  }

  getExamPeriods() {
    this._examPeriodSevice.getExamPeriods().then(examper =>
      this.examperiods = examper);
  }
  deleteExamPeriod(examperiod: ExamPeriod): void {
    this._examPeriodSevice.deleteExamPeriod(examperiod.id).then(
      () => this.getExamPeriods()
    );
  }
  updatePeriod(examperiod:ExamPeriod){
    this._examPeriodSevice.setter(examperiod);
    this._router.navigate(['/exam-period-form']);

  }
  newExamPeriod(){
    let exam = new ExamPeriod({ 
      name: '',
      startDate:null,
      endDate:null
    });
    this._examPeriodSevice.setter(exam);
    this._router.navigate(['/exam-period-form']);
  }

}
