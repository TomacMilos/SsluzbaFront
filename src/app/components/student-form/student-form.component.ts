import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/classes/student';
import {Router}  from '@angular/router';
import {StudentService}  from '../../shared_service/student.service';
import {ExamService}  from '../../shared_service/exam.service';
import { Subject} from 'rxjs';
import { Enrollment } from '../../classes/enrollment';
import { Documents } from '../../classes/documents';
import { Exam } from 'src/app/classes/exam';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  public student: Student;
  enrollments: Enrollment[];
  documents: Documents[];
  exams: Exam[];
  examspass:Exam[];
  constructor(private _studentService: StudentService, private _rotuer: Router,private _examService: ExamService) {
  }
  private RegenerateData = new Subject<void>();
  ngOnInit() {
    this.student = this._studentService.getter();
    console.log(this.student.firstName);
    if (this.student !== undefined){
    this._studentService.getStudentEnrollments(this.student.id).then(enrollments =>
      this.enrollments = enrollments);

    this._studentService.getStudentExams(this.student.id).then(exams =>
        this.exams = exams);

    this._studentService.getStudentExamsPass(this.student.id).then(exams =>
        this.examspass = exams);

    this._studentService.getStudentDocuments(this.student.id).then(documents =>
        this.documents = documents);
    }
  }
  deleteExam(examId:number){
    this._examService.deleteExam(examId).then(
      () => this.getExams()
    );
  }
  getExams() {
    this._studentService.getStudentExams(this.student.id).then(exams =>
      this.exams = exams);
  }
  processForm(){
    if (this.student.id === undefined){
      if(this.student.cardNumber == ""){
        alert("Niste uneli indeks studenta");
      }else if(this.student.firstName == ""){
        alert("Niste uneli ime studenta");
      }else if(this.student.lastName == ""){
        alert("Niste uneli prezime studenta");
      }
      else{
      this._studentService.addStudent(this.student)
      .then(student => {
        this._studentService.announceChange();
        this._rotuer.navigate(['']);
      });
    }
    }else{
      if(this.student.cardNumber == ""){
        alert("Niste uneli indeks studenta");
      }else if(this.student.firstName == ""){
        alert("Niste uneli ime studenta");
      }else if(this.student.lastName == ""){
        alert("Niste uneli prezime studenta");
      }
      else{
      this._studentService.editStudent(this.student)
      .then(student => {
        this._studentService.announceChange();
        this._rotuer.navigate(['']);
      });
    }
    }
  }
}

