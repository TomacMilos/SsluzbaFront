import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared_service/student.service';
import { Student} from 'src/app/classes/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sutdent-page',
  templateUrl: './sutdent-page.component.html',
  styleUrls: ['./sutdent-page.component.css']
})
export class SutdentPageComponent implements OnInit {
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
    var kurcina = localStorage.getItem(JSON.parse(localStorage.getItem('user')).studentid)
    this.studentService.getStudent(kurcina).then(student =>
      this.student = student);
  }

}
