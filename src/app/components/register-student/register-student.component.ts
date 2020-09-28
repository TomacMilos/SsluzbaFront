import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Login } from '../../classes/login';
import { LoginService } from "../../shared_service/login.service";
import { ActivatedRoute } from '@angular/router';
import { Authority } from 'src/app/classes/authority';
import { Student } from 'src/app/classes/student';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  login: Login;

  constructor(private route: ActivatedRoute, private loginService: LoginService,
   private location: Location) {
    this.login = new Login({
      username: null,
      password: null,
      authority: new Authority({
        name: 'STUDENT'
      }),
      student: new Student({
        cardNumber: null,
        firstName: null,
        lastName: null
      }),
      teacher: null
    });

 }

  ngOnInit(): void {
  }

  registerStudent(): void {
    if(this.login.username === null){
      alert("Unesite korisničko ime novog studenta!");
    }else if(this.login.password === null){
      alert("Unesite lozinku novog studenta!")
    }else if(this.login.student.cardNumber === null){
      alert("Unesite indeks novog studenta!")
    }else if(this.login.student.firstName === null){
      alert("Unesite ime novog studenta!")
    }else if(this.login.student.lastName === null){
      alert("Unesite prezime novog studenta!")
    }
    else {
    this.loginService.registerStudent(this.login.username, this.login.password, this.login.student.cardNumber,
      this.login.student.firstName, this.login.student.lastName)
      .then(login => {
        this.loginService.announceChange();
        window.location.href = "/";
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
