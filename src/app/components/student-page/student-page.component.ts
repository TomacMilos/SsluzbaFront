import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared_service/student.service';
import { Student} from 'src/app/classes/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  public student:Student;
  constructor(private studentService: StudentService, private _rotuer: Router) {
    this.student = new Student({
      cardNumber: '',
      firstName: '',
      lastName: ''
    })
  }

  ngOnInit(): void {
    this.student = this.studentService.getter();   

    this.studentService.getStudent(JSON.parse(localStorage.getItem('user')).studentid).then(student =>
      this.student = student);
  }

}
