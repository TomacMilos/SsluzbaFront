import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject} from 'rxjs';
import {Student} from '../classes/student';
import {Enrollment} from '../classes/enrollment'

@Injectable()
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/students';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private student: Student;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();
  constructor(private _http: Http) {}

  getStudents(): Promise<Student[]> {
    return this._http.get(this.baseUrl)
        .toPromise()
        .then(response =>
            response.json() as Student[])
        .catch(this.handleError);
}
  getStudent(id: Number): Promise<Student> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get(url)
        .toPromise()
        .then(response =>
            response.json() as Student)
        .catch(this.handleError);
}
  deleteStudent(id: Number): Promise<{}> {
    const url = `${this.baseUrl}/${id}`;
    return this._http
        .delete(url)
        .toPromise()
        .catch(this.handleError);
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

  getStudentEnrollments(studentId: number): Promise<Enrollment[]> {
    const url = `${this.baseUrl}/${studentId}/courses`;
    return this._http.get(url)
        .toPromise()
        .then(response =>
            response.json() as Enrollment[])
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
