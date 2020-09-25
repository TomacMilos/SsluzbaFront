import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/classes/student';
import {Router}  from '@angular/router';
import {StudentService}  from '../../shared_service/student.service';
import { Subject} from 'rxjs';
import { Enrollment } from '../../classes/enrollment';
import { Documents } from '../../classes/documents';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  public student: Student;
  enrollments: Enrollment[];
  documents: Documents[];
  constructor(private _studentService: StudentService, private _rotuer: Router) {
  }
  private RegenerateData = new Subject<void>();
  ngOnInit() {
    this.student = this._studentService.getter();
    console.log(this.student.firstName);
    if (this.student !== undefined){
    this._studentService.getStudentEnrollments(this.student.id).then(enrollments =>
      this.enrollments = enrollments);

      this._studentService.getStudentDocuments(this.student.id).then(documents =>
        this.documents = documents);
    }
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
      this._studentService.editStudent(this.student)
      .then(student => {
        this._studentService.announceChange();
        this._rotuer.navigate(['']);
      });
    }
  }
}

