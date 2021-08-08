import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Login } from '../../classes/login';
import { LoginService } from "../../shared_service/login.service";
import { ActivatedRoute } from '@angular/router';
import { Authority } from 'src/app/classes/authority';
import { Teacher } from 'src/app/classes/teacher';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {

  login: Login;
  public teacherRank = '';

  constructor(private route: ActivatedRoute, private loginService: LoginService,
   private location: Location, private _router: Router) {
    this.login = new Login({
      username: null,
      password: null,
      authority: new Authority({
        name: 'NASTAVNIK'
      }),
      student: null,
      teacher: new Teacher({
        firstName: null,
        lastName: null,
        teacherRank: null
      })
    });

 }

  ngOnInit(): void {
  }

  onChange(event) {
    this.teacherRank = event.target.options[event.target.options.selectedIndex].text;
  }

  registerTeacher(): void {
    if(this.login.username === null){
      alert("Unesite korisničko ime novog predavaca!");
    }else if(this.login.password === null){
      alert("Unesite lozinku novog predavaca!")
    }else if(this.login.teacher.firstName === null){
      alert("Unesite ime novog predavaca!")
    }else if(this.login.teacher.lastName === null){
      alert("Unesite prezime novog predavaca!")
    }else if(this.login.teacher.teacherRank === null){
      alert("Unesite ulogu novog predavaca!")
    }
    else {
    this.login.teacher.teacherRank = this.teacherRank;
    this.loginService.registerTeacher(this.login.username, this.login.password,
      this.login.teacher.firstName, this.login.teacher.lastName, this.login.teacher.teacherRank)
      .then(login => {
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
