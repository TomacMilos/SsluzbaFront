import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared_service/login.service';
import {Login} from '../../classes/login';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  
}
