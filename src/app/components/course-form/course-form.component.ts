import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared_service/course.service';
import {Course} from '../../classes/course';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Subject} from 'rxjs';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  public course: Course;
  constructor(private _courseService: CourseService, private _rotuer: Router) { }
  private RegenerateData = new Subject<void>();
  ngOnInit() {

    this.course = this._courseService.getter();
  
  }
  processForm(){
    if (this.course.id === undefined){
      this._courseService.addCourse(this.course)
      .then(course => {
        this._courseService.announceChange();
        this._rotuer.navigate(['courses']);
      });
    }else{
      this._courseService.editCourse(this.course)
      .then(course => {
        this._courseService.announceChange();
        this._rotuer.navigate(['courses']);
      });
    }
  }
}
