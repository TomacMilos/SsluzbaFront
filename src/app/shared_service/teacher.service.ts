import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TeacherService {
  private baseUrl = 'http://localhost:8080/api/teachers';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  constructor(private _http: Http) {}

  getTeachers(){
    return this._http.get(this.baseUrl + '/all', this.options).pipe(map((response: Response) => response.json()));
  }
  getTeacher(id: Number){
    return this._http.get(this.baseUrl + '/' + id, this.options).pipe(map((response: Response) => response.json()));
  }
  deleteTeacher(id: Number){
    return this._http.delete(this.baseUrl + '/' + id, this.options).pipe(map((response: Response) => response.json()));
  }
  createTeacher(){
    return this._http.post(this.baseUrl, this.options).pipe(map((response: Response) => response.json()));
  }
  updateTeacher(){
      return this._http.put(this.baseUrl, this.options).pipe(map((response: Response) => response.json()));
    }

}