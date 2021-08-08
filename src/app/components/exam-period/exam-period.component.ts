import { Component, OnInit } from '@angular/core';
import {ExamPeriod} from '../../classes/exam-period';
import {ExamPeriodServiceService} from '../../shared_service/exam-period-service.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { faCalendarAlt, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-period',
  templateUrl: './exam-period.component.html',
  styleUrls: ['./exam-period.component.css']
})
export class ExamPeriodComponent implements OnInit {

  public examperiods: ExamPeriod[];
  subscription: Subscription
  faTrash = faTrash;
  faPlus = faPlus;
  faCalendarAlt = faCalendarAlt


  constructor(private examPeriodSevice: ExamPeriodServiceService, private router: Router) {
    this.subscription = examPeriodSevice.RegenerateData$.subscribe(() =>
    this.getExamPeriods()
    )}

  ngOnInit(): void {
    this.getExamPeriods();
  }

  getExamPeriods() {
    this.examPeriodSevice.getExamPeriods().then(examper =>
      this.examperiods = examper);
  }
  deleteExamPeriod(examperiod: ExamPeriod): void {
    this.examPeriodSevice.deleteExamPeriod(examperiod.id).then(
      () => this.getExamPeriods()
    );
  }
  updatePeriod(examperiod:ExamPeriod){
    this.router.navigate(['/exam-period-form/'+examperiod.id]);

  }
  newExamPeriod(){
    let exam = new ExamPeriod({ 
      name: '',
      startDate:null,
      endDate:null
    });
    this.examPeriodSevice.setter(exam);
    this.router.navigate(['/exam-period-form/new']);
  }

}
