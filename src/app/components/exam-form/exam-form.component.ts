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

  constructor(private route: ActivatedRoute, private studentService: StudentService,
    private examService: ExamService, private courseService: CourseService,
     private examPeriodService: ExamPeriodServiceService, private location: Location) {
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

  this.examPeriodService.getExamPeriods().then(examPeriods =>
    this.examPeriods = examPeriods);
}

add(): void {
  if(this.exam.date === null){
    alert("Niste uneli datum i vreme ispita!");
  } else if(this.exam.course.name ===""){
    alert("Niste izabrali predmet!");
  } else if(this.exam.examPeriod.name ===""){
    alert("Niste izabrali ispitni rok!");
  } else {
  this.examService.addExam(this.exam)
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
