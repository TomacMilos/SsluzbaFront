import { Component, OnInit } from '@angular/core';
import { ExamPeriod } from 'src/app/classes/exam-period';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';
import { ExamPeriodServiceService } from 'src/app/shared_service/exam-period-service.service';
import { Router } from '@angular/router';
import 'rxjs';
import { Exam } from 'src/app/classes/exam';
import { ExamService } from 'src/app/shared_service/exam.service';
import { faCalendarAlt, faCalendarPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-period-form',
  templateUrl: './exam-period-form.component.html',
  styleUrls: ['./exam-period-form.component.css']
})

export class ExamPeriodFormComponent implements OnInit {
  examperiod: ExamPeriod;
  id: any;
  exams: Exam[];
  ngbStartDate: NgbDateStruct;
  ngbEndDate: NgbDateStruct;
  faSave = faSave;
  faTrash = faTrash;
  faCalendarPlus = faCalendarPlus
  faCalendar = faCalendarAlt;

  constructor(private router: Router, private examPeriodService: ExamPeriodServiceService, private examService: ExamService, private route: ActivatedRoute) {
  
    this.examperiod = new ExamPeriod(
      {
        name: '',
        startDate: null,
        endDate: null
      }
    )
  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== 'new') {
      this.examPeriodService.getExamPeriod(this.id).then(ep =>
        this.kurcina(ep)

      );
    if (this.examperiod !== undefined) {
      this.examPeriodService.getExamPeriodExams(this.id).then(exams =>
        this.exams = exams);
    }
  }
  }
  
  private kurcina(ep) {
    this.examperiod = ep
    var startDate = new Date(this.examperiod.startDate)
    console.log(this.examperiod.startDate)
    var endDate = new Date(this.examperiod.endDate)
    console.log(this.examperiod.endDate)
    this.ngbStartDate = { day: startDate.getUTCDate() + 1, month: startDate.getUTCMonth() + 1, year: startDate.getUTCFullYear() };
    this.ngbEndDate = { day: endDate.getUTCDate() + 1, month: endDate.getUTCMonth() + 1, year: endDate.getUTCFullYear() };
  }

  private getExam(): void {
    this.examPeriodService.getExamPeriodExams(this.id).then(exams =>
      this.exams = exams);
  }
  processForm() {
    if (this.ngbStartDate === undefined) {
      alert("Niste uneli datum pocetka ispitnog roka")
    } else if (this.ngbEndDate === undefined) {
      alert("Niste uneli datum kraja ispitnog roka")
    } else {
      this.examperiod.startDate = new Date(this.ngbStartDate.year, this.ngbStartDate.month - 1, this.ngbStartDate.day);
      this.examperiod.endDate = new Date(this.ngbEndDate.year, this.ngbEndDate.month - 1, this.ngbEndDate.day);
      if (this.examperiod.id === undefined) {
        if (this.examperiod.startDate > this.examperiod.endDate) {
          alert("Datum pocetka mora biti pre datuma kraja");
        } else if (this.examperiod.name == "") {
          alert("Mora se uneti naziv ispitnog roka");
        }
        else {
          this.examPeriodService.addExamPeriod(this.examperiod)
            .then(course => {
              this.examPeriodService.announceChange();
              this.router.navigate(['exam-period']);
            });
        }
      } else {
        if (this.examperiod.startDate > this.examperiod.endDate) {
          alert("Datum pocetka mora biti pre datuma kraja");
        } else if (this.examperiod.name == "") {
          alert("Mora se uneti naziv ispitnog roka");
        }
        else {
          this.examPeriodService.editExamPeriod(this.examperiod)
            .then(examperiod => {
              this.router.navigate(['exam-period']);
            });
        }
      }
    }
  }
  gotoAddExam(): void {
    this.router.navigate(['/exam-form/new'], { queryParams: { examPeriodId: this.examperiod.id } });
  }

  deleteExam(examId: number): void {
    this.examService.deleteExam(examId).then(
      () => this.getExam()
    );
  }

}
