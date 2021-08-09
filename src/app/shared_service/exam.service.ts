import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Exam } from '../classes/exam';
import { Subject } from 'rxjs';

@Injectable()
export class ExamService {
  private baseUrl = 'http://localhost:8080/api/exams';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private exam: Exam;

  constructor(private _http: Http) { }

  getExams(): Promise<Exam[]> {
    const url = `${this.baseUrl}/all`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Exam[])
      .catch(this.handleError);
  }

  getExam(id): Promise<Exam> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Exam)
      .catch(this.handleError);
  }

  editExam(exam: Exam): Promise<Exam> {
    return this._http
      .put(this.baseUrl, JSON.stringify(exam), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Exam)
      .catch(this.handleError);
  }
  addExam(exam: Exam): Promise<Exam> {
    return this._http
    .post(this.baseUrl, JSON.stringify(exam), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Exam)
      .catch(this.handleError);
  }

  examRegistration(examID: any, studentID: any): Promise<Exam> {
    const url = `${this.baseUrl}/${studentID}/examRegistration/${examID}`;
    return this._http
    .post(url, '', { headers: this.headers })
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

  examDate(exam: Exam): Promise<Exam> {
    const url = `${this.baseUrl}/examDate`;
    return this._http
      .put(url, JSON.stringify(exam), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Exam)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
  }
}
