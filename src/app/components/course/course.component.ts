import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared_service/course.service';
import {Course} from '../../classes/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public courses:Course[];

  constructor(private _courseService:CourseService) { }

  ngOnInit(){
    this._courseService.getCourses().subscribe(courses =>{
      this.courses = courses;
      console.log(this.courses);
    },(error)=>{
      console.log(error);
    })
  }
  deleteStudent(course){ 
    this._courseService.deleteCourse(course.id).subscribe((data)=>{
        this.courses.splice(this.courses.indexOf(course), 1);
    },(error)=>{
      console.log(error);
    });
    this.courses.splice(this.courses.indexOf(course), 1);
  }
}
