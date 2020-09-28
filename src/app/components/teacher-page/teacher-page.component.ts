import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/classes/course';
import { Teacher } from 'src/app/classes/teacher';
import { Login } from 'src/app/classes/login';
import { TeacherService } from 'src/app/shared_service/teacher.service';


@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {
  public teacher:Teacher;
  courses: Course[];

  constructor(private teacherService: TeacherService, private _rotuer: Router) {
    this.teacher = new Teacher({
      firstName:'',
      lastName:'',
      teacherRank:''
    })
  }

  ngOnInit(): void {
    this.teacher = this.teacherService.getter();
    console.log()

    this.teacherService.getTeacher((JSON.parse(localStorage.getItem('user')).teacherid)).then(teacher =>
      this.teacher = teacher);

      this.teacherService.getTeacherCourses(JSON.parse(localStorage.getItem('user')).teacherid).then(courses =>
        this.courses = courses);



  }

}
