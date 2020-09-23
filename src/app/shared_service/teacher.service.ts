import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Teacher } from '../classes/teacher';
import { Course } from '../classes/course';
import { Subject} from 'rxjs';

@Injectable()
export class TeacherService {
  private baseUrl = 'http://localhost:8080/api/teachers';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private teacher:Teacher;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();
  constructor(private _http: Http) {}

  getTeachers(): Promise<Teacher[]> {
    return this._http.get(this.baseUrl)
        .toPromise()
        .then(response =>
            response.json() as Teacher[])
        .catch(this.handleError);
}
getTeacher(id: Number): Promise<Teacher> {
  const url = `${this.baseUrl}/${id}`;
  return this._http.get(url)
      .toPromise()
      .then(response =>
          response.json() as Teacher)
      .catch(this.handleError);
}
deleteTeacher(id: Number): Promise<{}> {
  const url = `${this.baseUrl}/${id}`;
  return this._http
      .delete(url)
      .toPromise()
      .catch(this.handleError);
}
addTeacher(teacher: Teacher): Promise<Teacher> {
  return this._http
      .post(this.baseUrl, JSON.stringify(teacher), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Teacher)
      .catch(this.handleError);
}
editTeacher(teacher: Teacher): Promise<Teacher> {
  return this._http
      .put(this.baseUrl, JSON.stringify(teacher), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Teacher)
      .catch(this.handleError);
}
getTeacherCourses(teacherId: number): Promise<Course[]> {
  const url = `${this.baseUrl}/${teacherId}/courses`;
  return this._http.get(url)
      .toPromise()
      .then(response =>
          response.json() as Course[])
      .catch(this.handleError);
}
announceChange() {
  this.RegenerateData.next();
}

    setter(teacher: Teacher){
        this.teacher = teacher;
      }
    getter(){
    return this.teacher;
    }
    handleError(error: any): Promise<any> {
      console.error("Error... ", error);
      return Promise.reject(error.message || error);
  }
}