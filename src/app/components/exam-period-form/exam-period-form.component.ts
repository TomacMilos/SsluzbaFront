import { Component, OnInit } from '@angular/core';
import { ExamPeriod } from 'src/app/classes/exam-period';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';
import { ExamPeriodServiceService } from 'src/app/shared_service/exam-period-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exam-period-form',
  templateUrl: './exam-period-form.component.html',
  styleUrls: ['./exam-period-form.component.css']
})

export class ExamPeriodFormComponent implements OnInit {
  examperiod: ExamPeriod;

  // for date picker values
  ngbStartDate: NgbDateStruct;
  ngbEndDate: NgbDateStruct;

  constructor(private _rotuer: Router, private examPeriodService: ExamPeriodServiceService) {
      this.examperiod = new ExamPeriod(
        {
          name: '',
          startDate: null,
          endDate: null
        }
      )
    }

  ngOnInit(){
    this.examperiod = this.examPeriodService.getter();
  }
  processForm(){
    this.examperiod.startDate = new Date(this.ngbStartDate.year, this.ngbStartDate.month - 1, this.ngbStartDate.day);
    this.examperiod.endDate = new Date(this.ngbEndDate.year, this.ngbEndDate.month - 1, this.ngbEndDate.day);
    if (this.examperiod.id === undefined){
      this.examPeriodService.addExamPeriod(this.examperiod)
      .then(course => {
        this.examPeriodService.announceChange();
        this._rotuer.navigate(['exam-period']);
      });
    }else{
      this.examPeriodService.editExamPeriod(this.examperiod)
      .then(examperiod => {
        this.examPeriodService.announceChange();
        this._rotuer.navigate(['exam-period']);
      });
    }
  }

}
