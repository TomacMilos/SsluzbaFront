import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Enrollment } from '../../classes/enrollment';
import { Student } from '../../classes/student';
import { Course } from '../../classes/course';
import { CourseService } from '../../shared_service/course.service';
import { StudentService } from '../../shared_service/student.service';
import { EnrollmentService } from "../../shared_service/enrollment.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faBookmark, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgSelectConfig } from '@ng-select/ng-select';



@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {


  enrollment: Enrollment;
  students: Student[];

  // for date picker values
  ngbStartDate: NgbDateStruct;
  ngbEndDate: NgbDateStruct;
  minDateStart: any;
  minDateEnd: any;
  faSave = faSave
  faTimes = faTimes
  faBookMark = faBookmark;
  courseId;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private studentService: StudentService, private enrollmentService: EnrollmentService,
    private location: Location, private config: NgSelectConfig) {
    this.config.notFoundText = "Student nije pronadjen";
    this.enrollment = new Enrollment({
      startDate: null,
      endDate: null,
      student: new Student({
        cardNumber: '',
        firstName: '',
        lastName: ''
      }),
      course: new Course({
        name: ''
      })
    });

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params =>
      this.courseService.getCourse(params['courseId'])
        .then(course =>
          this.enrollment.course = course,
          this.courseId = params['courseId']
        ));
    var date = new Date

    this.minDateStart = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
    }
    this.minDateEnd = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate() + 3,
    }
    this.studentService.getStudentsEnableForCourse(this.courseId).then(students =>
      this.students = students);
  }

  add(): void {
    if (this.ngbStartDate === undefined) {
      alert("Niste uneli datum pocetka ispitnog roka")
    } else if (this.ngbEndDate === undefined) {
      alert("Niste uneli datum kraja ispitnog roka")
    } else if (this.enrollment.student.cardNumber === '') {
      alert("Izaberite studenta")
    }
    else {
      this.enrollment.startDate = new Date(this.ngbStartDate.year, this.ngbStartDate.month - 1, this.ngbStartDate.day);
      this.enrollment.endDate = new Date(this.ngbEndDate.year, this.ngbEndDate.month - 1, this.ngbEndDate.day);
      if (this.enrollment.startDate > this.enrollment.endDate) {
        alert("Datum pocetka mora biti pre datuma kraja");
      } else {
        this.enrollmentService.addEnrollment(this.enrollment)
          .then(enrollment => {
            this.enrollmentService.announceChange();
            this.goBack();
          });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }


}
