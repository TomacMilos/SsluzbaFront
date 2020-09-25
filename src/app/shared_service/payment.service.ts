import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject} from 'rxjs';
import {Payment} from '../classes/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/api/payments';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private payment: Payment;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();
  constructor(private _http: Http) {}

  getPayments(): Promise<Payment[]> {
    const url = `${this.baseUrl}/all`;
    return this._http.get(url)
        .toPromise()
        .then(response =>
            response.json() as Payment[])
        .catch(this.handleError);
}
  getPayment(id: Number): Promise<Payment> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get(url)
        .toPromise()
        .then(response =>
            response.json() as Payment)
        .catch(this.handleError);
}
  deletePayment(payment: Payment): Promise<{Payment}> {
    const url = `${this.baseUrl}/${payment.id}`;
    return this._http
        .delete(url)
        .toPromise()
        .catch(this.handleError);
}
  addPayment(payment: Payment): Promise<Payment> {
    return this._http
        .post(this.baseUrl, JSON.stringify(payment), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as Payment)
        .catch(this.handleError);
}

getAllPaymentsSum(): Promise<number> {
  const url = `${this.baseUrl}/allSum`;
  return this._http.get(url)
      .toPromise()
      .then(response =>
          response.json() as number)
      .catch(this.handleError);
}
 
  announceChange() {
    this.RegenerateData.next();
}
  setter(payment: Payment){
      this.payment = payment;
    }
  getter(){
    return this.payment;
  }
  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
}
}
