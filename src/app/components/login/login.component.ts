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


  constructor(private loginService: LoginService, private rotuer: Router, private route: ActivatedRoute) {
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

    localStorage.setItem('user',null);
    
  }

  loginProcess(studentUsername, studentPassword){
      if (studentUsername == "" || studentPassword == ""){
        alert('Molimo popunite formu');
      }else{
          this.loginService.getLogin(studentUsername, studentPassword)
            .then(login =>{
              localStorage.setItem('user', JSON.stringify(login));
              this.loginService.announceChange();

              console.log(JSON.parse(localStorage.getItem('user')).id);
              console.log(JSON.parse(localStorage.getItem('user')).authority.name);

              if (JSON.parse(localStorage.getItem('user')).authority.name == null){
                alert("Pogresan login")
              }else if (JSON.parse(localStorage.getItem('user')).authority.name == 'NASTAVNIK'){
                this.loginService.announceChange();
                this.rotuer.navigate(['teacher-page']);
                setTimeout(() => {
                  location.reload();
                }, 10);
              }else if (JSON.parse(localStorage.getItem('user')).authority.name == 'ADMIN'){
                this.loginService.announceChange();
                this.rotuer.navigate(['students']);
                setTimeout(() => {
                  location.reload();
                }, 10);
              }else if (JSON.parse(localStorage.getItem('user')).authority.name == 'STUDENT'){
                this.loginService.announceChange();
                this.rotuer.navigate(['student-page']);
                setTimeout(() => {
                  location.reload();
                }, 10);
              }
            });
          

      }

  }


  
}
