import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../shared_service/teacher.service';
import {Teacher} from '../../classes/teacher';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  public teachers:Teacher[];
  subscription: Subscription;


  constructor(private _teacherService:TeacherService, private _router: Router) {
    this.subscription = _teacherService.RegenerateData$.subscribe(() =>
    this.getTeachers()  );
  }

  ngOnInit(): void {

    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }

    this.getTeachers();
  }

  getTeachers() {
    this._teacherService.getTeachers().then(students =>
      this.teachers = students);
  }
  deleteTeacher(teacher){ 
    this._teacherService.deleteTeacher(teacher.id).then(
      () => this.getTeachers()
    );
  }

  updateTeacher(teacher){
    this._teacherService.setter(teacher);
    this._router.navigate(['/teacher-form']);

  }
  newTeacher(){
    this._router.navigate(['/register-teacher']);
  }

}