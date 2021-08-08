import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared_service/course.service';
import {Course} from '../../classes/course';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { faChalkboardTeacher, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public courses: Course[];
  subscription: Subscription
  faTrash = faTrash;
  faChalkboardTeacher = faChalkboardTeacher;
  faPlus = faPlus;

  constructor(private courseService: CourseService, private router: Router) {
   }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses().then(courses =>
      this.courses = courses);
  }

  deleteCourses(course: Course): void {
    this.courseService.deleteCourse(course.id).then(
      () => this.getCourses()
    );
  }
  updateCourse(course){
    this.router.navigate(['/course-form/'+course.id]);
  }
  newCourse(){
    this.router.navigate(['/course-form/new']);
  }
}
