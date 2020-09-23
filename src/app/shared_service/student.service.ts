import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject} from 'rxjs';
import {Student} from '../classes/student';

@Injectable()
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/students';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private student: Student;
  private RegenerateData = new Subject<void>();
  constructor(private _http: Http) {}

  getStudents(){
    return this._http.get(this.baseUrl + '/all', this.options).pipe(map((response: Response) => response.json()));
  }
  getStudent(id: Number){
    return this._http.get(this.baseUrl + '/' + id, this.options).pipe(map((response: Response) => response.json()));
  }
  deleteStudent(id: Number){
    return this._http.delete(this.baseUrl + '/' + id, this.options).pipe(map((response: Response) => response.json()));
  }
  addStudent(student: Student): Promise<Student> {
    return this._http
        .post(this.baseUrl, JSON.stringify(student), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as Student)
        .catch(this.handleError);
}
    editStudent(student: Student): Promise<Student> {
      return this._http
          .put(this.baseUrl, JSON.stringify(student), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as Student)
          .catch(this.handleError);
  }
  announceChange() {
    this.RegenerateData.next();
}
  setter(student: Student){
      this.student = student;
    }
  getter(){
  return this.student;
  }
  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
}

}
