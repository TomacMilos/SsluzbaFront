import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Login } from '../classes/login';
import { TeacherStudentID } from '../classes/TeacherStudentID';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/user';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private login: Login;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();
  constructor(private _http: Http, private _router: Router, private http: HttpClient) { }

  getLogin(username: String, password: String): Promise<Login> {
    const url = `${this.baseUrl}/login/${username}/${password}`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Login)
      .catch(this.handleError);
  }

  registerStudent(username: String, password: String, cardNumber: String, firstName: String, lastName: String): Promise<Login> {
    const url = `${this.baseUrl}/registerStudent/${username}/${password}/${cardNumber}/${firstName}/${lastName}`;
    return this._http
      .post(url, { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  loginUser(userData) {
    return this.http.post<any>(`http://localhost:8080/authenticate`, userData);
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('role');
    this._router.navigate(['login'])
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  loggedIn() {
    if (!this.getRole() || !this.getToken()) {
      return false;
    }
    return true;
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAuthorized(roles): boolean {
    var isMatch = false;

    var role = localStorage.getItem('role');
    roles.forEach(element => {
      if (element === role) {
        isMatch = true;
        return false;
      }
    });

    return isMatch;
  }

  getLoggedInUserKorIme() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    const kor = decodedToken.sub;
    return kor;
  }

  public getTeacherOrStudentId(username): Observable<TeacherStudentID> {
    return this.http.get<TeacherStudentID>(this.baseUrl+ '/' + username);
  }


  registerTeacher(username: String, password: String, firstName: String, lastName: String, teacherRank: String): Promise<Login> {
    const url = `${this.baseUrl}/registerTeacher/${username}/${password}/${firstName}/${lastName}/${teacherRank}`;
    return this._http
      .post(url, { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  registerAdmin(username: String, password: String): Promise<Login> {
    const url = `${this.baseUrl}/registerAdmin/${username}/${password}`;
    return this._http
      .post(url, { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
  }

}
