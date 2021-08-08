import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Login } from '../../classes/login';
import { LoginService } from "../../shared_service/login.service";
import { ActivatedRoute } from '@angular/router';
import { Authority } from 'src/app/classes/authority';
import { Router } from "@angular/router";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  login: Login;
  faUserPlus = faUserPlus;


  constructor(private route: ActivatedRoute, private loginService: LoginService,
   private location: Location, private _router: Router) {
    this.login = new Login({
      username: null,
      password: null,
      authority: new Authority({
        name: 'ADMIN'
      }),
      student: null,
      teacher: null
    });

 }

  ngOnInit(): void {

  }

  registerAdmin(): void {
    if(this.login.username === null){
      alert("Unesite korisničko ime!");
    }else if(this.login.password === null){
      alert("Unesite lozinku!")
    }
    else {
    this.loginService.registerAdmin(this.login.username, this.login.password)
      .then(login => {
        window.location.href = "/";
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
