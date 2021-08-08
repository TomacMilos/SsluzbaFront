import { Component, OnInit } from '@angular/core';
import { faCalendarAlt, faChalkboardTeacher, faFileAlt, faGraduationCap, faHome, faMoneyBillWave, faMoneyBillWaveAlt, faUserGraduate, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/classes/login';
import { SharedService } from './components/login/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularTSEOProject';
  public role: String;
  public jwt: String;
  clickEventSubscription: Subscription;
  faUserGraduate = faUserGraduate;
  faChalkboardTeacher = faChalkboardTeacher;
  faUsers = faUsers;
  faCalendarAlt = faCalendarAlt
  faFileAlt = faFileAlt
  faMoneyBillWaveAlt = faMoneyBillWaveAlt;
  faUserPlus = faUserPlus;
  faGraduationCap = faGraduationCap;
  faHome = faHome;


  constructor(private sharedService: SharedService) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.ngOnInit();
    })
  }


  ngOnInit() {
    this.role = localStorage.getItem('role')
    this.jwt = localStorage.getItem('jwt')
  }

  logout() {
    localStorage.clear();
    this.sharedService.sendClickEvent();
  }
}
