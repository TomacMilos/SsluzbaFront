import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/courses';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  constructor(private _http: Http) {}

  getCourses(){
    return this._http.get(this.baseUrl + '/', this.options).pipe(map((response: Response) => response.json()));
  }
  getCourse(id: Number){
    return this._http.get(this.baseUrl + '/' + id, this.options).pipe(map((response: Response) => response.json()));
  }
  deleteCourse(id: Number){
    return this._http.delete(this.baseUrl + '/' + id, this.options).pipe(map((response: Response) => response.json()));
  }
  createCourse(){
    return this._http.post(this.baseUrl, this.options).pipe(map((response: Response) => response.json()));
  }
  updateCourse(){
      return this._http.put(this.baseUrl, this.options).pipe(map((response: Response) => response.json()));
    }

}
