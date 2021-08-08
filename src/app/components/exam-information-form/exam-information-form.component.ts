import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/classes/course';
import { Exam } from 'src/app/classes/exam';
import { ExamPeriod } from 'src/app/classes/exam-period';
import { Login } from 'src/app/classes/login';
import { Student } from 'src/app/classes/student';
import { ExamService } from 'src/app/shared_service/exam.service';
import { LoginService } from 'src/app/shared_service/login.service';
import {Location} from '@angular/common';
import { faSave, faScroll } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-information-form',
  templateUrl: './exam-information-form.component.html',
  styleUrls: ['./exam-information-form.component.css']
})
export class ExamInformationFormComponent implements OnInit {
  exam: Exam;
  public user: Login;
  auth : any;
  faSave = faSave;
  faScroll = faScroll


  constructor(private _examService: ExamService, private router: Router, private route: ActivatedRoute, private loginService: LoginService, private location: Location) {
    this.exam = new Exam({
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
  }

  ngOnInit(): void {

    this.auth = localStorage.getItem('role')


    this.route.queryParams.subscribe(params =>
      this._examService.getExam(params['examId'])
        .then(exam =>
          this.exam = exam
        ));
  }
  saveExamPoints(exam: Exam) {
    if (exam.examPoints + exam.labPoints > 100) {
      alert("Maximalan broj poena je 100")
    } else if (exam.examPoints + exam.labPoints == 0) {
      alert("Unesite broj bodova")
    }
    else {
      this._examService.editExam(exam).then(e => {
        if (this.loginService.getRole() === "ADMIN") {
          this.location.back();
          this.router.navigate(['/courses']);
        } else if ((this.loginService.getRole() === "NASTAVNIK")) {
          this.router.navigate(['/teacher-page']);
        }
      });
    }
  }

}
