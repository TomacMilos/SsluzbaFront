import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../shared_service/student.service';
import {Student} from '../../classes/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private students:Student[];

  constructor(private _studentService:StudentService) { }

  ngOnInit(){
    this._studentService.getStudents().subscribe(students =>{
      console.log(students);
    },(error)=>{
      console.log(error);
    })
  }

}
