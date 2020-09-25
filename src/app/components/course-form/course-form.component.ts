import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared_service/course.service';
import {EnrollmentService} from '../../shared_service/enrollment.service';
import { ActivatedRoute, Params } from '@angular/router';
import {Enrollment} from '../../classes/enrollment';
import {Course} from '../../classes/course';
import {Router} from '@angular/router';
import { Subject} from 'rxjs';
import { Location } from '@angular/common';


import 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  course: Course = new Course({ // if we add a new course, create an empty course
    name: '',
  });

  enrollments: Enrollment[];

  constructor(private _courseService: CourseService, private _rotuer: Router, 
    private _enrollmentService: EnrollmentService, private route: ActivatedRoute, private location: Location) {
      _enrollmentService.RegenerateData$.subscribe(() =>
      this.getEnrollments()
    );
     }
  private RegenerateData = new Subject<void>();
  ngOnInit() {
    this.course = this._courseService.getter();
    if (this.course !== undefined){
    this._courseService.getCourseEnrollments(this.course.id).then(enrollments =>
      this.enrollments = enrollments);
    }
  }

  private getEnrollments(): void {
    this._courseService.getCourseEnrollments(this.course.id).then(enrollments =>
      this.enrollments = enrollments);
  }
  processForm(){
    if (this.course.id === undefined){
      if(this.course.name == ""){
        alert("Niste uneli naziv kursa");
      }
      else{  
        this._courseService.addCourse(this.course)
        .then(course => {
          this._courseService.announceChange();
         this._rotuer.navigate(['courses']);
      });
    }
    }else{
       if(this.course.name == ""){
          alert("Niste uneli naziv kursa");
        }
        else{
      this._courseService.editCourse(this.course)
      .then(course => {
        this._courseService.announceChange();
        this._rotuer.navigate(['courses']);
      });
    }
    }
  }
  gotoAddEnrollment(): void {
    this._rotuer.navigate(['/enrollment-form'], { queryParams: { courseId: this.course.id } });
  }

  deleteEnrollment(enrollmentId: number): void {
    this._enrollmentService.deleteEnrollment(enrollmentId).then(
      () => this.getEnrollments()
    );
  }
}
