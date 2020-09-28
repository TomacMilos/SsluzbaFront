import { Component, OnInit } from '@angular/core';
import { ExamPeriod } from 'src/app/classes/exam-period';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';
import { ExamPeriodServiceService } from 'src/app/shared_service/exam-period-service.service';
import {Router} from '@angular/router';
import 'rxjs';
import { Exam } from 'src/app/classes/exam';
import { ExamService } from 'src/app/shared_service/exam.service';
import { Subject} from 'rxjs';

@Component({
  selector: 'app-exam-period-form',
  templateUrl: './exam-period-form.component.html',
  styleUrls: ['./exam-period-form.component.css']
})

export class ExamPeriodFormComponent implements OnInit {
  examperiod: ExamPeriod;
  exams : Exam[];
  // for date picker values
  ngbStartDate: NgbDateStruct;
  ngbEndDate: NgbDateStruct;

  constructor(private _router: Router, private examPeriodService: ExamPeriodServiceService, private _examService: ExamService) {
      this.examperiod = new ExamPeriod(
        {
          name: '',
          startDate: null,
          endDate: null
        }
      )
      _examService.RegenerateData$.subscribe(() =>
      this.getExam())
    }
    private RegenerateData = new Subject<void>();
  ngOnInit(){

    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }

    this.examperiod = this.examPeriodService.getter();
    if (this.examperiod !== undefined){
      this.examPeriodService.getExamPeriodExams(this.examperiod.id).then(exams =>
        this.exams = exams);
      }
  }
  private getExam(): void {
    this.examPeriodService.getExamPeriodExams(this.examperiod.id).then(exams =>
      this.exams = exams);
  }
  processForm(){
    if (this.ngbStartDate === undefined){
      alert("Niste uneli datum pocetka ispitnog roka")
    }else if (this.ngbEndDate === undefined){
      alert("Niste uneli datum kraja ispitnog roka")
    }else{
    this.examperiod.startDate = new Date(this.ngbStartDate.year, this.ngbStartDate.month - 1, this.ngbStartDate.day);
    this.examperiod.endDate = new Date(this.ngbEndDate.year, this.ngbEndDate.month - 1, this.ngbEndDate.day);
    if (this.examperiod.id === undefined){
      if (this.examperiod.startDate > this.examperiod.endDate){
        alert("Datum pocetka mora biti pre datuma kraja");
      }else if (this.examperiod.name == ""){
        alert("Mora se uneti naziv ispitnog roka");
      }
      else{
      this.examPeriodService.addExamPeriod(this.examperiod)
      .then(course => {
        this.examPeriodService.announceChange();
        this._router.navigate(['exam-period']);
      });
    }
    }else{
      if (this.examperiod.startDate > this.examperiod.endDate){
        alert("Datum pocetka mora biti pre datuma kraja");
      }else if (this.examperiod.name == ""){
        alert("Mora se uneti naziv ispitnog roka");
      }
      else{
      this.examPeriodService.editExamPeriod(this.examperiod)
      .then(examperiod => {
        this.examPeriodService.announceChange();
        this._router.navigate(['exam-period']);
      });
    }
    }
  }
  }
  gotoAddExam(): void {
    this._router.navigate(['/exam-form'], { queryParams: { examPeriodId: this.examperiod.id } });
  }

  deleteExam(examId: number): void {
    this._examService.deleteExam(examId).then(
      () => this.getExam()
    );
  }

}
