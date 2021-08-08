import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../shared_service/teacher.service';
import {Teacher} from '../../classes/teacher';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { faEdit, faPlus, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  public teachers:Teacher[];
  subscription: Subscription;
  faTrash = faTrash;
  faPlus = faPlus;
  faUsers = faUsers;

  constructor(private teacherService:TeacherService, private router: Router) {
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.getTeachers().then(students =>
      this.teachers = students);
  }
  deleteTeacher(teacher){ 
    this.teacherService.deleteTeacher(teacher.id).then(
      () => this.getTeachers()
    );
    this.teacherService.deleteTeacher(teacher.id).then(
      () => this.getTeachers()
    );
  }

  updateTeacher(teacher){
    this.router.navigate(['/teacher-form/'+ teacher.id]);

  }
  newTeacher(){
    this.router.navigate(['/register-teacher']);
  }

}