import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import {ExamPeriod} from '../classes/exam-period';
import { Observable, Subject} from 'rxjs';
import { Exam } from '../classes/exam';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExamPeriodServiceService {
  private baseUrl = 'http://localhost:8080/api/examPeriods';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private RegenerateData = new Subject<void>();
  private examPeriod: ExamPeriod;
  RegenerateData$ = this.RegenerateData.asObservable();
  constructor(private _http: Http, private http: HttpClient) {}

  getExamPeriods(): Promise<ExamPeriod[]> {
    return this._http.get(this.baseUrl+"/all")
        .toPromise()
        .then(response =>
            response.json() as ExamPeriod[])
        .catch(this.handleError);
}

getUpcomingExamPeriods(): Promise<ExamPeriod[]> {
  return this._http.get(this.baseUrl+"/upcoming")
      .toPromise()
      .then(response =>
          response.json() as ExamPeriod[])
      .catch(this.handleError);
}

getExamPeriod(id: number): Promise<ExamPeriod> {
  const url = `${this.baseUrl}/${id}`;
  return this._http.get(url)
      .toPromise()
      .then(response =>
          response.json() as ExamPeriod)
      .catch(this.handleError);
}
deleteExamPeriod(id: Number): Promise<{}> {
  const url = `${this.baseUrl}/${id}`;
  return this._http
      .delete(url)
      .toPromise()
      .catch(this.handleError);
}
addExamPeriod(ep: ExamPeriod): Promise<ExamPeriod> {
  return this._http
      .post(this.baseUrl, JSON.stringify(ep), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as ExamPeriod)
      .catch(this.handleError);
}
editExamPeriod(ep: ExamPeriod): Promise<ExamPeriod> {
  return this._http
      .put(this.baseUrl, JSON.stringify(ep), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as ExamPeriod)
      .catch(this.handleError);
}

getExamPeriodExams(examperiodId: number): Promise<Exam[]> {
  const url = `${this.baseUrl}/${examperiodId}/exams`;
  return this._http.get(url)
      .toPromise()
      .then(response =>
          response.json() as Exam[])
      .catch(this.handleError);
}

public getExamPeriodExamsStudent(examperiodId: number, studentID: any): Observable<Exam[]> {
  return this.http.get<Exam[]>(this.baseUrl+ '/' + examperiodId + '/exam/'+studentID);
}

getNextExamPeriods(): Promise<ExamPeriod[]> {
  return this._http.get(this.baseUrl+"/nextExamPeriods")
      .toPromise()
      .then(response =>
          response.json() as ExamPeriod[])
      .catch(this.handleError);
}

announceChange() {
  this.RegenerateData.next();
}
setter(ep: ExamPeriod){
this.examPeriod = ep;
}
getter(){
return this.examPeriod;
}
  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
}

}
