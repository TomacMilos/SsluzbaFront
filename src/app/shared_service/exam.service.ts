import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import {Exam} from '../classes/exam';
import { Subject} from 'rxjs';

@Injectable()
export class ExamService {
  private baseUrl = 'http://localhost:8080/api/exams';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private RegenerateData = new Subject<void>();
  private exam: Exam;
  RegenerateData$ = this.RegenerateData.asObservable();
  constructor(private _http: Http) {}

    
  addExam(exam: Exam): Promise<Exam> {
    return this._http
        .post(this.baseUrl, JSON.stringify(exam), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as Exam)
        .catch(this.handleError);
}
deleteExam(examId: number): Promise<{}> {
  const url = `${this.baseUrl}/${examId}`;
  return this._http
      .delete(url)
      .toPromise()
      .catch(this.handleError);
}
announceChange() {
  this.RegenerateData.next();
}
setter(exam: Exam){
this.exam = exam;
}
getter(){
return this.exam;
}
  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
}
}
