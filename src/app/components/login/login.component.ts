import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared_service/login.service';
import {Login} from '../../classes/login';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from '@angular/router';
import { Authority } from 'src/app/classes/authority';
import { SharedService } from './shared.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;


  constructor(private loginService: LoginService, private _router: Router, private route: ActivatedRoute, private sharedService: SharedService) {
    this.login = new Login({
      username: '',
      password: '',
      authority: new Authority({
        name: ''
      }),
      student: null,
      teacher: null
    });
  }

  ngOnInit(): void {
    this.sharedService.sendClickEvent();
    console.log(localStorage);
    if(localStorage){
      if(localStorage.getItem('role') == 'ADMIN'){
        this._router.navigate(['/students']);
    }else if(localStorage.getItem('role') == 'NASTAVNIK'){
        this._router.navigate(['/teacher-page']);
    }else if(localStorage.getItem('role') == 'STUDENT'){
        this._router.navigate(['/student-page']);
    }
    }
  }

  ok(username,password){
    var userLogin = {
      username : username,
      password : password
    }
    this.loginService.loginUser(userLogin)
    .subscribe(
      response => {
        localStorage.setItem('jwt',response.jwt)
        localStorage.setItem('role',response.uloga)
        this.sharedService.sendClickEvent();
        if(response.uloga == 'ADMIN'){
            this._router.navigate(['/students']);
        }else if(response.uloga == 'NASTAVNIK'){
            this._router.navigate(['/teacher-page']);
        }else if(response.uloga == 'STUDENT'){
            this._router.navigate(['/student-page']);
        }
      },
      error => {
        alert('Pogresni podaci!');
      }
    );
  }
  
}
