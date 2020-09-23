import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Enrollment } from '../../classes/enrollment';
import { Student } from '../../classes/student';
import { Course } from '../../classes/course';

import { CourseService } from '../../shared_service/course.service';
import { StudentService } from "../../shared_service/student.service";
import { EnrollmentService } from "../../shared_service/enrollment.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

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

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private studentService: StudentService, private enrollmentService: EnrollmentService,
    private location: Location) {
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
          this.enrollment.course = course 
        ));

    this.studentService.getStudents().then(students =>
      this.students = students);
  }

  private add(): void {
    // convert NgbDateStruct dates to Date objects
    this.enrollment.startDate = new Date(this.ngbStartDate.year, this.ngbStartDate.month-1, this.ngbStartDate.day);
    this.enrollment.endDate = new Date(this.ngbEndDate.year, this.ngbEndDate.month-1, this.ngbEndDate.day);

    this.enrollmentService.addEnrollment(this.enrollment)
      .then(enrollment => {
        this.enrollmentService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
