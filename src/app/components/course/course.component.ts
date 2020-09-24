import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared_service/course.service';
import {Course} from '../../classes/course';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public courses: Course[];
  subscription: Subscription

  constructor(private _courseService: CourseService, private _router: Router) {
    this.subscription = _courseService.RegenerateData$.subscribe(() =>
    this.getCourses()
  );
   }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this._courseService.getCourses().then(courses =>
      this.courses = courses);
  }

  deleteCourses(course: Course): void {
    this._courseService.deleteCourse(course.id).then(
      () => this.getCourses()
    );
  }
  updateCourse(course){
    this._courseService.setter(course);
    this._router.navigate(['/course-form']);

  }
  newCourse(){
    let course = new Course({ 
      name: '',  
    });
    this._courseService.setter(course);
    this._router.navigate(['/course-form']);
  }
}
