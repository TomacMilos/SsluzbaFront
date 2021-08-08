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
import { ExamService } from 'src/app/shared_service/exam.service';
import { LoginService } from 'src/app/shared_service/login.service';

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
  examPeriod: ExamPeriod;
  public sum: number;
  constructor(private studentService: StudentService, private _router: Router, private examPeriodService: ExamPeriodServiceService,
    private ls: LoginService,
    private examService: ExamService) {
    this.student = new Student({
      cardNumber: '',
      firstName: '',
      lastName: ''
    })
  }

  ngOnInit(): void {

    localStorage.setItem('examPeriod',null);
    this.ls.getTeacherOrStudentId(this.ls.getLoggedInUserKorIme()).subscribe(res => {
      console.log(this.ls.getLoggedInUserKorIme());
      console.log(res)

    this.studentService.getStudentEnrollments(res.studentID).then(enrollments =>
      this.enrollments = enrollments);

    this.studentService.getStudentExams(res.studentID).then(exams =>
        this.exams = exams);

    this.studentService.getStudentExamsPass(res.studentID).then(exams =>
        this.examspass = exams);

    this.studentService.getStudentNextExams(res.studentID).then(exams =>
        this.nextexams = exams);

    this.studentService.getStudentDocuments(res.studentID).then(documents =>
        this.documents = documents);

    this.studentService.getStudentPayments(res.studentID).then(payments =>
        this.payments = payments);

    this.studentService.getAllPaymentsSum(res.studentID).then(sum =>
        this.sum = sum);

    this.examPeriodService.getNextExamPeriods().then(examPers => this.nextExamPeriods = examPers);


    this.studentService.getStudent(res.studentID).then(student =>
      this.student = student);
    });
  }

  gotoInfo(examid:number): void {
    this._router.navigate(['/exam-info'], { queryParams: { examId: examid } });
  }

  prijavaIspita(examPeriodId:number): void {
    this.examPeriodService.getExamPeriod(examPeriodId).then(examPeriod =>{
      localStorage.setItem('examPeriod', JSON.stringify(examPeriod));
    });
    this._router.navigate(['/exam-registration'], { queryParams: { examPeriodId: examPeriodId } });
  }

  odjava(examId:number): void {
    this.examService.deleteExam(examId);
    location.reload();
  }

}
