import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared_service/student.service';
import { Student} from 'src/app/classes/student';
import { Router } from '@angular/router';
import { Enrollment } from '../../classes/enrollment';
import { Documents } from '../../classes/documents';
import { Exam } from 'src/app/classes/exam';
import { Payment } from 'src/app/classes/payment';
import { PaymentService } from 'src/app/shared_service/payment.service';
import { ExamPeriod } from 'src/app/classes/exam-period';
import { ExamPeriodServiceService } from 'src/app/shared_service/exam-period-service.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  public student:Student;
  enrollments: Enrollment[];
  documents: Documents[];
  payments: Payment[];
  exams: Exam[];
  examspass:Exam[];
  nextexams:Exam[];
  nextExamPeriods: ExamPeriod[];
  public sum: number;
  constructor(private studentService: StudentService, private _router: Router, private examPeriodService: ExamPeriodServiceService) {
    this.student = new Student({
      cardNumber: '',
      firstName: '',
      lastName: ''
    })
  }

  ngOnInit(): void {

    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    }

    this.studentService.getStudentEnrollments(JSON.parse(localStorage.getItem('user')).studentid).then(enrollments =>
      this.enrollments = enrollments);

    this.studentService.getStudentExams(JSON.parse(localStorage.getItem('user')).studentid).then(exams =>
        this.exams = exams);

    this.studentService.getStudentExamsPass(JSON.parse(localStorage.getItem('user')).studentid).then(exams =>
        this.examspass = exams);

    this.studentService.getStudentNextExams(JSON.parse(localStorage.getItem('user')).studentid).then(exams =>
        this.nextexams = exams);

    this.studentService.getStudentDocuments(JSON.parse(localStorage.getItem('user')).studentid).then(documents =>
        this.documents = documents);

    this.studentService.getStudentPayments(JSON.parse(localStorage.getItem('user')).studentid).then(payments =>
        this.payments = payments);

    this.studentService.getAllPaymentsSum(JSON.parse(localStorage.getItem('user')).studentid).then(sum =>
        this.sum = sum);

    this.examPeriodService.getNextExamPeriods().then(examPers => this.nextExamPeriods = examPers);

    this.student = this.studentService.getter();   

    this.studentService.getStudent(JSON.parse(localStorage.getItem('user')).studentid).then(student =>
      this.student = student);
  }

  gotoInfo(examid:number): void {
    this._router.navigate(['/exam-info'], { queryParams: { examId: examid } });
  }

  prijavaIspita(examPeriodId:number): void {
    this._router.navigate(['/exam-registration'], { queryParams: { examPeriodId: examPeriodId } });
  }

}
