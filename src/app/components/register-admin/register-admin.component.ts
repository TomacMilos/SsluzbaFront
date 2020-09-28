import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Login } from '../../classes/login';
import { LoginService } from "../../shared_service/login.service";
import { ActivatedRoute } from '@angular/router';
import { Authority } from 'src/app/classes/authority';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  login: Login;

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

    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }

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
        this.loginService.announceChange();
        window.location.href = "/";
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
