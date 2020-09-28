import { Component, OnInit } from '@angular/core';
import {Exam} from '../../classes/exam';
import {ExamService} from '../../shared_service/exam.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {Student} from '../../classes/student';
import {Course} from '../../classes/course';
import {ExamPeriod} from '../../classes/exam-period';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  public exams: Exam[];
  subscription: Subscription

  constructor(private _examService: ExamService, private _router: Router) {
    this.subscription = _examService.RegenerateData$.subscribe(() =>
    this.getExams()
  );
   }

   ngOnInit(): void {

    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }

    this.getExams();
  }

  getExams() {
    this._examService.getExams().then(exam =>
      this.exams = exam);
  }

  deleteExam(exam: Exam): void {
    this._examService.deleteExam(exam.id).then(
      () => this.getExams()
    );
  }
  
  newExam(){
    let exam = new Exam({ 
      examPoints: 0,
      labPoints: 0,
      date: null,
      course: new Course({
        name: ''
      }),
      student: new Student({
        cardNumber: '',
        firstName: '',
        lastName: ''
      }),
      examPeriod: new ExamPeriod({
        name: '',
        startDate: null,
        endDate: null,
      }),
    });
    this._examService.setter(exam);
    this._router.navigate(['/exam-form']);
  }

}
