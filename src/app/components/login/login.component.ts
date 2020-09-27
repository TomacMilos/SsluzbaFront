import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared_service/login.service';
import {Login} from '../../classes/login';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from '@angular/router';
import { Authority } from 'src/app/classes/authority';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;


  constructor(private _loginService: LoginService, private _rotuer: Router, private route: ActivatedRoute) {
    this.login = new Login({
      username: '',
      password: '',
      authority: new Authority({
        name: ''
      }),
      studentid: null,
      teacherid: null
    });
  }

  ngOnInit(): void {
    sessionStorage.setItem('role',null);
    sessionStorage.setItem('userid',null);
  }

  loginProcess(studentUsername, studentPassword){
    if (studentUsername == "" || studentPassword == ""){
      alert('Molimo popunite formu');
    }else{
        this._loginService.getLogin(studentUsername, studentPassword)
          .then(login =>
            sessionStorage.setItem('userid', login.id.toString())
            );
        console.log(sessionStorage.getItem('userid'));
        this._loginService.getLogin(studentUsername, studentPassword)
            .then(login =>
              sessionStorage.setItem('role', login.authority.name)
              );
              console.log(sessionStorage.getItem('role'))
        if (sessionStorage.getItem('role') == null){
                alert("Pogresan login")
              }else if (sessionStorage.getItem('role') == 'NASTAVNIK'){
                this._loginService.announceChange();
                this._rotuer.navigate(['teacher-page']);
              }else if (sessionStorage.getItem('role') == 'ADMIN'){
                this._loginService.announceChange();
                this._rotuer.navigate(['students']);
              }
    }
  }


  
}
