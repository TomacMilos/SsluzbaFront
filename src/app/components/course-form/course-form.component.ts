import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared_service/course.service';
import { EnrollmentService } from '../../shared_service/enrollment.service';
import { ExamService } from '../../shared_service/exam.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Enrollment } from '../../classes/enrollment';
import { Course } from '../../classes/course';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';


import 'rxjs';
import { Exam } from 'src/app/classes/exam';
import { faChalkboardTeacher, faSave, faUserPlus, faUserTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  examspass: Exam[];
  courseId: any;
  role: any;
  faSave = faSave
  faUserPlus = faUserPlus
  faUserTimes = faUserTimes
  faChalBoard = faChalkboardTeacher;

  course: Course = new Course({ // if we add a new course, create an empty course
    name: '',
  });

  enrollments: Enrollment[];

  constructor(private courseService: CourseService, private router: Router, private enrollmentService: EnrollmentService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.role = localStorage.getItem('role');
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      if (this.courseId === 'new') {
        this.course = {
          id: undefined,
          name: ''
        };
      } else {
        {
          this.courseService.getCourse(this.courseId).then(course =>
            this.course = course
          );
          if (this.courseId !== undefined) {
            this.courseService.getCourseEnrollments(this.courseId).then(enrollments =>
              this.enrollments = enrollments);
            this.courseService.getCourseExams(this.courseId).then(exams =>
              this.examspass = exams);
          }
        }
      }
    });
  }

  gotoInfo(examid: number): void {
    this.router.navigate(['/exam-info'], { queryParams: { examId: examid } });
  }

  processForm() {
    if (this.course.id === undefined) {
      if (this.course.name == "") {
        alert("Niste uneli naziv kursa");
      }
      else {
        this.courseService.addCourse(this.course)
          .then(course => {
            this.router.navigate(['courses']);
          });
      }
    } else {
      if (this.course.name == "") {
        alert("Niste uneli naziv kursa");
      }
      else {
        this.courseService.editCourse(this.course)
          .then(course => {
            this.router.navigate(['courses']);
          });
      }
    }
  }
  gotoAddEnrollment(): void {
    this.router.navigate(['/enrollment-form'], { queryParams: { courseId: this.course.id } });
  }

  deleteEnrollment(enrollmentId: number): void {
    this.enrollmentService.deleteEnrollment(enrollmentId).then(
      () => this.courseService.getCourseEnrollments(this.courseId).then(enrollments =>
        this.enrollments = enrollments)
    );
  }
}
