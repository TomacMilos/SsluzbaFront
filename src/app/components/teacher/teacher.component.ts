import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../shared_service/teacher.service';
import {Teacher} from '../../classes/teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  public teachers:Teacher[];

  constructor(private _teacherService:TeacherService) { }

  ngOnInit(){
    this._teacherService.getTeachers().subscribe(teachers =>{
      this.teachers = teachers;
      console.log(this.teachers);
    },(error)=>{
      console.log(error);
    })
  }
  deleteStudent(teacher){ 
    this._teacherService.deleteTeacher(teacher.id).subscribe((data)=>{
        this.teachers.splice(this.teachers.indexOf(teacher), 1);
    },(error)=>{
      console.log(error);
    });
    this.teachers.splice(this.teachers.indexOf(teacher), 1);
  }

}