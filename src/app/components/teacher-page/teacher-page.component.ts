import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/classes/course';
import { Teacher } from 'src/app/classes/teacher';
import { Login } from 'src/app/classes/login';
import { TeacherService } from 'src/app/shared_service/teacher.service';
import { CourseService } from 'src/app/shared_service/course.service';
import { LoginService } from 'src/app/shared_service/login.service';
import { faHandPointer, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {
  public teacher: Teacher;
  courses: Course[];
  faUser = faUser;
  faPointer = faHandPointer;

  constructor(private _courseService: CourseService, private teacherService: TeacherService, private _router: Router, private ls: LoginService) {
    this.teacher = new Teacher({
      firstName: '',
      lastName: '',
      teacherRank: ''
    })
  }

  ngOnInit(): void {

    this.ls.getTeacherOrStudentId(this.ls.getLoggedInUserKorIme()).subscribe(res => {
      console.log(res)
      this.teacherService.getTeacher(res.teacherID).then(teacher =>
        this.teacher = teacher);

      this.teacherService.getTeacherCourses(res.teacherID).then(courses =>
        this.courses = courses);

    });
  }
  updateCourse(course) {
    this._router.navigate(['/course-form/' + course.id]);

  }

}
