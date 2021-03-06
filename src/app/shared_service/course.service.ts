import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Course } from '../classes/course'
import { Enrollment } from '../classes/enrollment'
import { Subject } from 'rxjs';
import { Exam } from '../classes/exam';

@Injectable()
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/courses';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }

  getCourses(): Promise<Course[]> {
    return this.http.get(this.baseUrl)
      .toPromise()
      .then(response =>
        response.json() as Course[])
      .catch(this.handleError);
  }

  getCourse(id: number): Promise<Course> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Course)
      .catch(this.handleError);
  }

  deleteCourse(id: Number): Promise<{}> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .delete(url)
      .toPromise()
      .catch(this.handleError);
  }

  createCourse() {
    return this.http.post(this.baseUrl, this.options).pipe(map((response: Response) => response.json()));
  }

  addCourse(course: Course): Promise<Course> {
    return this.http
      .post(this.baseUrl, JSON.stringify(course), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Course)
      .catch(this.handleError);
  }

  editCourse(course: Course): Promise<Course> {
    return this.http
      .put(this.baseUrl, JSON.stringify(course), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Course)
      .catch(this.handleError);
  }

  getCourseEnrollments(courseId: number): Promise<Enrollment[]> {
    const url = `${this.baseUrl}/${courseId}/students`;
    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Enrollment[])
      .catch(this.handleError);
  }

  getCourseExams(courseId: number): Promise<Exam[]> {
    const url = `${this.baseUrl}/${courseId}/examspasscourse`;
    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Exam[])
      .catch(this.handleError);
  }

  getExamPeriodCourses(studentId: number, examPeriodId: number): Promise<Course[]> {
    const url = `${this.baseUrl}/${studentId}/${examPeriodId}`;
    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Course[])
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('Error... ', error);
    return Promise.reject(error.message || error);
  }
}
