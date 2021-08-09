import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { from } from 'rxjs';
import { Course } from 'src/app/classes/course';
import { Exam } from 'src/app/classes/exam';
import { CourseService } from 'src/app/shared_service/course.service';
import { ExamPeriodServiceService } from 'src/app/shared_service/exam-period-service.service';
import { ExamService } from 'src/app/shared_service/exam.service';
import { LoginService } from 'src/app/shared_service/login.service';

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
  studentID: any;
  exams : Exam[];
  faCheck = faCheckSquare;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private examService: ExamService, private location: Location, private ls: LoginService,private examPeriodService: ExamPeriodServiceService) {
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

    this.ls.getTeacherOrStudentId(this.ls.getLoggedInUserKorIme()).subscribe(res => {
      this.studentID = res.studentID;

        this.examPeriodService.getExamPeriodExamsStudent(this.examPeriodId, res.studentID).subscribe(exams =>{
          this.exams = exams;
        });
    
    })
    

  }

  add(exam): void {
      this.examService.examRegistration(exam.id, this.studentID)
        .then(exam => {
          this.goBack();
        });
  }

  goBack(): void {
    this.location.back();
  }

}
