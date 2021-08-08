import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from } from 'rxjs';
import { Course } from 'src/app/classes/course';
import { Exam } from 'src/app/classes/exam';
import { CourseService } from 'src/app/shared_service/course.service';
import { ExamService } from 'src/app/shared_service/exam.service';

@Component({
  selector: 'app-exam-registration',
  templateUrl: './exam-registration.component.html',
  styleUrls: ['./exam-registration.component.css']
})
export class ExamRegistrationComponent implements OnInit {

  courses: Course[];
  exam: Exam;
  showCourse = false;
  examPeriodId: any;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private examService: ExamService, private location: Location, private _router: Router) {
    this.exam = new Exam({
      examPoints: 0,
      labPoints: 0,
      date: null,
      course: null,
      student: null,
      examPeriod: null
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.examPeriodId = params.examPeriodId;
    });
    
    this.courseService.getExamPeriodCourses(JSON.parse(localStorage.getItem('user')).studentid, this.examPeriodId).then(course =>
      this.courses = course
      );
  }

  add(): void {
    if (this.exam.course.name === null) {
      alert("Niste uneli predmet!");
    } else {
      this.examService.examRegistration(this.exam, JSON.parse(localStorage.getItem('user')).studentid,this.examPeriodId)
        .then(exam => {
          this.goBack();
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
