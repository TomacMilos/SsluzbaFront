import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
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
    this.exam = this.examService.getter();
    }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }
  }

  edit(): void {
    if(this.exam.date === null){
      alert("Niste uneli datum i vreme ispita!");
    } else {
    this.examService.examDate(this.exam)
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
