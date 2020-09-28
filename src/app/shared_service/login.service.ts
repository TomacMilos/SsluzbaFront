import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject} from 'rxjs';
import { Login } from '../classes/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/user';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private login: Login;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();
  constructor(private _http: Http) { }

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

announceChange() {
  this.RegenerateData.next();
}
handleError(error: any): Promise<any> {
  console.error("Error... ", error);
  return Promise.reject(error.message || error);
}

}
