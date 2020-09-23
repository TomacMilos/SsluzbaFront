import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../shared_service/student.service';
import {Student} from '../../classes/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public students:Student[];

  constructor(private _studentService:StudentService) { }

  ngOnInit(){
    this._studentService.getStudents().subscribe(students =>{
      this.students = students;
      console.log(this.students);
    },(error)=>{
      console.log(error);
    })
  }
  deleteStudent(student){ 
    this._studentService.deleteStudent(student.id).subscribe((data)=>{
        this.students.splice(this.students.indexOf(student), 1);
    },(error)=>{
      console.log(error);
    });
    this.students.splice(this.students.indexOf(student), 1);
  }

}
