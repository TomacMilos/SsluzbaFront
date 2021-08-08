import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/classes/student';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../shared_service/student.service';
import { ExamService } from '../../shared_service/exam.service';
import { Subject } from 'rxjs';
import { Enrollment } from '../../classes/enrollment';
import { Documents } from '../../classes/documents';
import { Exam } from 'src/app/classes/exam';
import { Payment } from 'src/app/classes/payment';
import { PaymentService } from 'src/app/shared_service/payment.service';
import { faInfo, faSave, faTimes, faUserAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  student: Student;
  studentId: any;
  enrollments: Enrollment[];
  documents: Documents[];
  payments: Payment[];
  exams: Exam[];
  examspass: Exam[];
  nextexams: Exam[];
  sum: number;
  isStudentLoaded = false;
  faSave = faSave;
  faInfo = faInfo;
  faTimes = faTimes
  faUser = faUserAlt
  constructor(private _studentService: StudentService, private _router: Router, private _examService: ExamService, private route: ActivatedRoute) {


  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.studentId = params['id'];
    });

    this._studentService.getStudentById(this.studentId).subscribe(res => {
      this.student = res;

      if (this.student !== undefined) {

        this._studentService.getStudentEnrollments(this.student.id).then(enrollments =>
          this.enrollments = enrollments);

        this._studentService.getStudentExams(this.student.id).then(exams =>
          this.exams = exams);

        this._studentService.getStudentExamsPass(this.student.id).then(exams =>
          this.examspass = exams);

        this._studentService.getStudentNextExams(this.student.id).then(exams =>
          this.nextexams = exams);

        this._studentService.getStudentDocuments(this.student.id).then(documents =>
          this.documents = documents);

        this._studentService.getStudentPayments(this.student.id).then(payments =>
          this.payments = payments);

        this._studentService.getAllPaymentsSum(this.student.id).then(sum =>
          this.sum = sum);
      }
      this.isStudentLoaded=true;
    },
      error => { console.log("Neuspesno"); })

  }
  deleteExam(examId: number) {
    this._examService.deleteExam(examId).then(
      () => this.getExams()
    );
  }
  
  getExams() {
    this._studentService.getStudentNextExams(this.student.id).then(exams =>
      this.nextexams = exams);
  }

  gotoInfo(examid: number): void {
    this._router.navigate(['/exam-info'], { queryParams: { examId: examid } });
  }

  processForm() {
    if (this.student.id === undefined) {
      if (this.student.cardNumber == "") {
        alert("Niste uneli indeks studenta");
      } else if (this.student.firstName == "") {
        alert("Niste uneli ime studenta");
      } else if (this.student.lastName == "") {
        alert("Niste uneli prezime studenta");
      }
      else {
        this._studentService.addStudent(this.student)
          .then(student => {
            this._router.navigate(['/students']);
          });
      }
    } else {
      if (this.student.cardNumber == "") {
        alert("Niste uneli indeks studenta");
      } else if (this.student.firstName == "") {
        alert("Niste uneli ime studenta");
      } else if (this.student.lastName == "") {
        alert("Niste uneli prezime studenta");
      }
      else {
        this._studentService.editStudent(this.student)
          .then(student => {
            this._router.navigate(['/students']);
          });
      }
    }
  }
}

