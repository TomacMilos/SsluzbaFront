import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/classes/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularTSEOProject';
  public user: Login;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }

  logout() {
    localStorage.setItem('user',null);
  }
}
