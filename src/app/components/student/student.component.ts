import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../shared_service/student.service';
import { Student } from '../../classes/student';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faEdit, faPlus, faTrash, faUserGraduate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public students: Student[];
  subscription: Subscription
  faUserGraduate = faUserGraduate;
  faTrash = faTrash;
  faPlus = faPlus;

  constructor(private studentService: StudentService, private router: Router) {
  }

  ngOnInit(): void {
    this.getStudents();

  }



  getStudents() {
    this.studentService.getStudents().then(students =>
      this.students = students);
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student).then(
      () => this.getStudents()
    );
  }
  updateStudent(student) {
    this.router.navigate(['/student-form/' + student.id]);

  }
  newStudent() {
    this.router.navigate(['/register-student']);
  }


}
