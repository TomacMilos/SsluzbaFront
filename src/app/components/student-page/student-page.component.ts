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
  constructor(private studentService: StudentService, private _router: Router) {
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

    this.student = this.studentService.getter();   

    this.studentService.getStudent(JSON.parse(localStorage.getItem('user')).studentid).then(student =>
      this.student = student);
  }

}
