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
  public teacherRank = '';
  public selectedTeacherRank = '';

  constructor(private teacherService: TeacherService, private _router: Router) { }
  private RegenerateData = new Subject<void>();

  ngOnInit() {

    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }

    this.teacher = this.teacherService.getter();
    if (this.teacher !== undefined){
      this.teacherService.getTeacherCourses(this.teacher.id).then(courses =>
        this.courses = courses);
        this.selectedTeacherRank = this.teacher.teacherRank;
      }
  }
  onChange(event) {
    this.teacherRank = event.target.options[event.target.options.selectedIndex].text;
  }
  processForm(){
    if (this.teacher.id === undefined){

      this.teacher.teacherRank = this.teacherRank;
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
