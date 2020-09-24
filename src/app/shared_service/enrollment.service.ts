import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { Enrollment } from '../classes/enrollment';

import 'rxjs';

@Injectable()
export class EnrollmentService {
    private enrollment: Enrollment;
    private baseUrl = 'http://localhost:8080/api/enrollment';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private RegenerateData = new Subject<void>();
    RegenerateData$ = this.RegenerateData.asObservable();
    constructor(private _http: Http) { }

    announceChange() {
        this.RegenerateData.next();
    }

    
    addEnrollment(enrollment: Enrollment): Promise<Enrollment> {
        return this._http
            .post(this.baseUrl, JSON.stringify(enrollment), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Enrollment)
            .catch(this.handleError);
    }

    deleteEnrollment(enrollmentId: number): Promise<{}> {
        const url = `${this.baseUrl}/${enrollmentId}`;
        return this._http
            .delete(url)
            .toPromise()           
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error("Error... ", error);
        return Promise.reject(error.message || error);
    }
}