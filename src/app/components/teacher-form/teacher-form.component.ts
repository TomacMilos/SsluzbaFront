import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../classes/teacher';
import {Router}  from '@angular/router';
import {TeacherService}  from '../../shared_service/teacher.service';
import { Subject} from 'rxjs';
import { Course } from '../../classes/course'

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  public teacher: Teacher;
  courses: Course[];

  constructor(private teacherService: TeacherService, private _rotuer: Router) { }
  private RegenerateData = new Subject<void>();

  ngOnInit() {
    this.teacher = this.teacherService.getter();
    console.log(this.teacher.firstName);
    if (this.teacher !== undefined){
      this.teacherService.getTeacherCourses(this.teacher.id).then(courses =>
        this.courses = courses);
      }
  }
  processForm(){
    if (this.teacher.id === undefined){
      this.teacherService.addTeacher(this.teacher)
      .then(teacher => {
        this.teacherService.announceChange();
        this._rotuer.navigate(['teachers']);
      });
    }else{
      this.teacherService.editTeacher(this.teacher)
      .then(teacher => {
        this.teacherService.announceChange();
        this._rotuer.navigate(['teachers']);
      });
    }
  }

}
