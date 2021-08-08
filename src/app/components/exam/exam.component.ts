import { Component, OnInit } from '@angular/core';
import {Exam} from '../../classes/exam';
import {ExamService} from '../../shared_service/exam.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {Student} from '../../classes/student';
import {Course} from '../../classes/course';
import {ExamPeriod} from '../../classes/exam-period';
import { faCalendar, faGraduationCap, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  public exams: Exam[];
  subscription: Subscription
  faTrash= faTrash;
  faCalendar = faCalendar;
  faPlus = faPlus;
  faGraduationCap = faGraduationCap;



  constructor(private _examService: ExamService, private _router: Router) {
   }

   ngOnInit(): void {

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
    this._router.navigate(['/exam-form']);
  }

  editDate(exam){
    this._router.navigate(['/exam-date']);

  }

}
