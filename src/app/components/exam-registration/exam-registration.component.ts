import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private examService: ExamService, private location: Location, private _router: Router) {
    this.exam = new Exam({
      examPoints: 0,
      labPoints: 0,
      date: null,
      course: null,
      student: null,
      examPeriod: JSON.parse(localStorage.getItem('examPeriod'))
    });
    }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('user')).studentid);
    this.courseService.getExamPeriodCourses(JSON.parse(localStorage.getItem('user')).studentid, JSON.parse(localStorage.getItem('examPeriod')).id).then(course =>
      this.courses = course);
  }

  add(): void {
    if(this.exam.course.name === null){
      alert("Niste uneli predmet!");
    } else {
    this.examService.examRegistration(this.exam, JSON.parse(localStorage.getItem('user')).studentid)
      .then(exam => {
        this.examService.announceChange();
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
