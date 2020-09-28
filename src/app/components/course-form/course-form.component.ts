import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared_service/course.service';
import {EnrollmentService} from '../../shared_service/enrollment.service';
import {ExamService} from '../../shared_service/exam.service';
import { ActivatedRoute, Params } from '@angular/router';
import {Enrollment} from '../../classes/enrollment';
import {Course} from '../../classes/course';
import {Router} from '@angular/router';
import { Subject} from 'rxjs';
import { Location } from '@angular/common';


import 'rxjs';
import { Login } from 'src/app/classes/login';
import { Exam } from 'src/app/classes/exam';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  examspass:Exam[];
  public user: Login;
  course: Course = new Course({ // if we add a new course, create an empty course
    name: '',
  });

  enrollments: Enrollment[];

  constructor(private _courseService: CourseService, private _router: Router, 
    private _enrollmentService: EnrollmentService, private route: ActivatedRoute, private location: Location,private examService:ExamService) {
      _enrollmentService.RegenerateData$.subscribe(() =>
      this.getEnrollments()
    );
    examService.RegenerateData$.subscribe(() =>
    this.getExams()
    );
     }
  private RegenerateData = new Subject<void>();
  
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }
    
    this.course = this._courseService.getter();
    if (this.course !== undefined){
    this._courseService.getCourseEnrollments(this.course.id).then(enrollments =>
      this.enrollments = enrollments);
    this._courseService.getCourseExams(this.course.id).then(exams =>
        this.examspass = exams);
    }
  }

  private getEnrollments(): void {
    this._courseService.getCourseEnrollments(this.course.id).then(enrollments =>
      this.enrollments = enrollments);
  }
  gotoInfo(examid:number): void {
    this._router.navigate(['/exam-info'], { queryParams: { examId: examid } });
  }
  private getExams(): void {
    this._courseService.getCourseExams(this.course.id).then(exams =>
      this.examspass = exams);
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
         this._router.navigate(['courses']);
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
        this._router.navigate(['courses']);
      });
    }
    }
  }
  gotoAddEnrollment(): void {
    this._router.navigate(['/enrollment-form'], { queryParams: { courseId: this.course.id } });
  }

  deleteEnrollment(enrollmentId: number): void {
    this._enrollmentService.deleteEnrollment(enrollmentId).then(
      () => this.getEnrollments()
    );
  }
}
