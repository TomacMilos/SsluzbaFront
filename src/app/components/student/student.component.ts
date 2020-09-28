import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../shared_service/student.service';
import {Student} from '../../classes/student';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public students: Student[];
  subscription: Subscription

  constructor(private _studentService: StudentService, private _router: Router) {
    this.subscription = _studentService.RegenerateData$.subscribe(() =>
    this.getStudents()
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

    this.getStudents();
  }

  getStudents() {
    this._studentService.getStudents().then(students =>
      this.students = students);
  }

  deleteStudent(student: Student): void {
    this._studentService.deleteStudent(student).then(
      () => this.getStudents()
    );
  }
  updateStudent(student){
    this._studentService.setter(student);
    this._router.navigate(['/student-form']);

  }
  newStudent(){
    let student = new Student({ 
      cardNumber: '',
      firstName: '',
      lastName: ''
    });
    this._studentService.setter(student);
    this._router.navigate(['/student-form']);
  }
  gotoPage(){
    this._router.navigate(['student-page']);
  }

}
