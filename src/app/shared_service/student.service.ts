import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Student } from '../classes/student';
import { Enrollment } from '../classes/enrollment'
import { Documents } from '../classes/documents'
import { Exam } from '../classes/exam';
import { Payment } from '../classes/payment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/students';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private student: Student;

  constructor(private _http: Http, private http: HttpClient) { }

  getStudents(): Promise<Student[]> {
    return this._http.get(this.baseUrl+'/all')
      .toPromise()
      .then(response =>
        response.json() as Student[])
      .catch(this.handleError);
  }

  getStudentsEnableForCourse(id:number): Promise<Student[]> {
    return this._http.get(this.baseUrl+'/course/'+id)
      .toPromise()
      .then(response =>
        response.json() as Student[])
      .catch(this.handleError);
  }

  public getStudentById(id): Observable<Student> {
    return this.http.get<Student>(this.baseUrl + '/' + id);
  }

  getStudent(id): Promise<Student> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Student)
      .catch(this.handleError);
  }

  deleteStudent(student: Student): Promise<{ Student }> {
    const url = `${this.baseUrl}/${student.id}`;
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

  getStudentExams(studentId: number): Promise<Exam[]> {
    const url = `${this.baseUrl}/${studentId}/exams`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Exam[])
      .catch(this.handleError);
  }
  getStudentExamsPass(studentId: number): Promise<Exam[]> {
    const url = `${this.baseUrl}/${studentId}/examspass`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Exam[])
      .catch(this.handleError);
  }

  getStudentNextExams(studentId: number): Promise<Exam[]> {
    const url = `${this.baseUrl}/${studentId}/nextexems`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Exam[])
      .catch(this.handleError);
  }

  getStudentDocuments(studentId: number): Promise<Documents[]> {
    const url = `${this.baseUrl}/${studentId}/documents`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Documents[])
      .catch(this.handleError);
  }

  getStudentPayments(studentId: number): Promise<Payment[]> {
    const url = `${this.baseUrl}/${studentId}/payments`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Payment[])
      .catch(this.handleError);
  }

  getAllPaymentsSum(studentId: number): Promise<number> {
    const url = `${this.baseUrl}/${studentId}/allSum`;
    return this._http.get(url)
      .toPromise()
      .then(response =>
        response.json() as number)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
  }

}
