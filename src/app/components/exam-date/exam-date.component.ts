import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/classes/course';
import { Exam } from 'src/app/classes/exam';
import { CourseService } from 'src/app/shared_service/course.service';
import { ExamService } from 'src/app/shared_service/exam.service';

@Component({
  selector: 'app-exam-date',
  templateUrl: './exam-date.component.html',
  styleUrls: ['./exam-date.component.css']
})
export class ExamDateComponent implements OnInit {

  courses: Course[];
  exam: Exam;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private examService: ExamService, private location: Location, private _router: Router) {
    }

  ngOnInit(): void {
  }

  edit(): void {
    if(this.exam.date === null){
      alert("Niste uneli datum i vreme ispita!");
    } else {
    this.examService.examDate(this.exam)
      .then(exam => {
        this.goBack();
      });
    }
  }
  
  goBack(): void {
    this.location.back();
  }

}
