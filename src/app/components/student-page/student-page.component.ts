import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared_service/student.service';
import { Student } from 'src/app/classes/student';
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
import { faCheckSquare, faChevronDown, faChevronUp, faHandPointer, faInfo, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  public student: Student;
  enrollments: Enrollment[];
  documents: Documents[];
  payments: Payment[];
  exams: Exam[];
  examspass: Exam[];
  nextexams: Exam[];
  nextExamPeriods: ExamPeriod[];
  studentID
  examPeriod: ExamPeriod;
  public sum: number;
  faUser = faUser;
  faInfo = faInfo;
  faPointer = faCheckSquare;
  faTimes = faTimes;
  showPrijavaIspita = false;
  showRezultatiIspita = false;
  showIspitiUNarednomP = false;
  showDokumenti = false;
  showUplate = false;
  showSlusanjeKurseva = false;
  showObradaRezultata = false;
  faUp = faChevronUp
  faDown = faChevronDown
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

    localStorage.setItem('examPeriod', null);
    this.ls.getTeacherOrStudentId(this.ls.getLoggedInUserKorIme()).subscribe(res => {
      this.studentID = res.studentID

      this.studentService.getStudent(res.studentID).then(student =>
        this.student = student);
    });
  }

  show(attr) {
    if (!this[attr]) {
      if (attr === 'showSlusanjeKurseva') {
        this.studentService.getStudentEnrollments(this.studentID).then(enrollments =>
          this.enrollments = enrollments);
      } else if (attr === 'showPrijavaIspita') {
        this.examPeriodService.getNextExamPeriods().then(examPers => this.nextExamPeriods = examPers);
      } else if (attr === 'showRezultatiIspita') {
        this.studentService.getStudentExamsPass(this.studentID).then(exams =>
          this.examspass = exams);
      } else if (attr === 'showObradaRezultata') {
        this.studentService.getStudentExams(this.studentID).then(exams =>
          this.exams = exams);
      } else if (attr === 'showIspitiUNarednomP') {
        this.studentService.getStudentNextExams(this.studentID).then(exams =>
          this.nextexams = exams);
      } else if (attr === 'showDokumenti') {
        this.studentService.getStudentDocuments(this.studentID).then(documents =>
          this.documents = documents);
      }
      else if (attr === 'showUplate') {
        this.studentService.getStudentPayments(this.studentID).then(payments =>
          this.payments = payments);
  
        this.studentService.getAllPaymentsSum(this.studentID).then(sum =>
          this.sum = sum);
      }
    }
    this[attr] = !this[attr]
    console.log(attr)
    console.log(this[attr])


  }

  gotoInfo(examid: number): void {
    this._router.navigate(['/exam-info'], { queryParams: { examId: examid } });
  }

  prijavaIspita(examPeriodId: number): void {
    this._router.navigate(['/exam-registration'], { queryParams: { examPeriodId: examPeriodId } });
  }

  odjava(exam): void {
    this.examService.deleteExam(exam.id);
    this.nextexams.forEach((value, index) => {
      if (value == exam) this.nextexams.splice(index, 1);
    });
  }

}
