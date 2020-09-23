import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../classes/teacher';
import {Router}  from '@angular/router';
import {TeacherService}  from '../../shared_service/teacher.service';
import { Subject} from 'rxjs';
import { Enrollment } from '../../classes/enrollment'

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  public teacher: Teacher;
  enrollments: Enrollment[];

  constructor(private teacherService: TeacherService, private _rotuer: Router) { }
  private RegenerateData = new Subject<void>();

  ngOnInit() {
    this.teacher = this.teacherService.getter();
    console.log(this.teacher.firstName);
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
