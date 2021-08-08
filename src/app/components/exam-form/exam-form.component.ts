import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Exam } from '../../classes/exam';
import { Student } from '../../classes/student';
import { Course } from '../../classes/course';
import { ExamPeriod } from '../../classes/exam-period';
import { StudentService } from "../../shared_service/student.service";
import { ExamService } from "../../shared_service/exam.service";
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared_service/course.service';
import { ExamPeriodServiceService } from 'src/app/shared_service/exam-period-service.service';
import { Router } from "@angular/router";
import { NgSelectConfig } from '@ng-select/ng-select';
import { faExclamationTriangle, faPlusCircle, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {

  exam: Exam;
  students: Student[];
  courses: Course[];
  examPeriods: ExamPeriod[];
  time = { hour: 12, minute: 30 };
  faSave = faSave;
  faPlusCircle = faPlusCircle;
  faTimes = faTimes;
  minDateStart: any;
  maxDateStart: any;
  ngbStartDate: NgbDateStruct;


  exclamationTriangle = faExclamationTriangle;

  constructor(private route: ActivatedRoute, private studentService: StudentService,
    private examService: ExamService, private courseService: CourseService,
    private examPeriodService: ExamPeriodServiceService, private location: Location, private _router: Router, private config: NgSelectConfig) {

    this.exam = new Exam({
      examPoints: 0,
      labPoints: 0,
      date: null,
      course: new Course({
        name: ''
      }),
      student: new Student({
        cardNumber: '',
        firstName: '',
        lastName: ''
      }),
      examPeriod: new ExamPeriod({
        name: '',
        startDate: null,
        endDate: null,
      }),
    });

  }

  ngOnInit() {

    this.studentService.getStudents().then(students =>
      this.students = students);

    this.courseService.getCourses().then(courses =>
      this.courses = courses);

    this.examPeriodService.getUpcomingExamPeriods().then(examPeriods =>
      this.examPeriods = examPeriods);
  }

  changePeriod(): void {
    var min = new Date(this.exam.examPeriod.startDate);
    this.minDateStart = {
      year: min.getUTCFullYear(),
      month: min.getUTCMonth() + 1,
      day: min.getUTCDate(),
    }

    var max = new Date(this.exam.examPeriod.endDate);
    this.maxDateStart = {
      year: max.getUTCFullYear(),
      month: max.getUTCMonth() + 1,
      day: max.getUTCDate(),
    }

    console.log(this.minDateStart);
    console.log(this.maxDateStart);

  }

  add(): void {
    if (!this.ngbStartDate) {
      alert("Niste uneli datum!");
    } else if (this.exam.course.name === "") {
      alert("Niste izabrali predmet!");
    } else if (this.exam.examPeriod.name === "") {
      alert("Niste izabrali ispitni rok!");
    } else {
      this.exam.date = new Date(this.ngbStartDate.year, this.ngbStartDate.month - 1, this.ngbStartDate.day, this.time.hour + 2, this.time.minute);
      console.log(this.exam)
      this.examService.addExam(this.exam)
        .then(exam => {
          this.goBack();
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
