import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/classes/course';
import { Exam } from 'src/app/classes/exam';
import { ExamPeriod } from 'src/app/classes/exam-period';
import { Login } from 'src/app/classes/login';
import { Student } from 'src/app/classes/student';
import { ExamService } from 'src/app/shared_service/exam.service';

@Component({
  selector: 'app-exam-information-form',
  templateUrl: './exam-information-form.component.html',
  styleUrls: ['./exam-information-form.component.css']
})
export class ExamInformationFormComponent implements OnInit {
  exam: Exam;
  student:Student;
  public user: Login;
  

  constructor(private _examService: ExamService, private _router: Router,private route: ActivatedRoute ) {
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
    this.user = JSON.parse(localStorage.getItem('user'));
    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
   
    }

    this.exam = this._examService.getter();
    this.route.queryParams.subscribe(params =>
      this._examService.getExam(params['examId'])
        .then(exam =>
          this.exam = exam
        )); 
    }
    saveExamPoints(exam:Exam){
      if(exam.examPoints+exam.labPoints>100){
        alert("Maximalan broj poena je 100")
      }else if(exam.examPoints+exam.labPoints==0){
        alert("Unesite broj bodova")
      }
      else{
      this._examService.editExam(exam).then(course => {
        this._examService.announceChange();
        if(this.user.authority.name=="ADMIN"){
        this._router.navigate(['/courses']);
        }else if((this.user.authority.name=="NASTAVNIK")){
          this._router.navigate(['/teacher-page']);
        }
      });
    }
  }

}
