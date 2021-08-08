import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Teacher } from '../classes/teacher';
import { Course } from '../classes/course';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TeacherService {
  private baseUrl = 'http://localhost:8080/api/teachers';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private teacher: Teacher;

  constructor(private _http: Http, private http: HttpClient) { }

  getTeachers(): Promise<Teacher[]> {
    return this._http.get(this.baseUrl)
      .toPromise()
      .then(response =>
        response.json() as Teacher[])
      .catch(this.handleError);
  }

  public getTeacherById(id): Observable<Teacher> {
    return this.http.get<Teacher>(this.baseUrl + '/' + id);
  }

  public getCourses(id): Observable<Teacher> {
    return this.http.get<Teacher>(this.baseUrl + '/' + id + '/courses/add');
  }

  getTeacher(id): Promise<Teacher> {
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

  addCourse(teacherID: number, courseID: number): Promise<Teacher> {
    return this._http
      .put(this.baseUrl + '/' + teacherID + '/course/' + courseID, { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Teacher)
      .catch(this.handleError);
  }

  removeCourse(teacherID: number, courseID: number): Promise<Teacher> {
    return this._http
      .put(this.baseUrl + '/' + teacherID + '/remove/' + courseID, { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Teacher)
      .catch(this.handleError);
  }

  getTeacherCourses(teacherId): Promise<Course[]> {
    const url = `${this.baseUrl}/${teacherId}/courses`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Course[])
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
  }
}