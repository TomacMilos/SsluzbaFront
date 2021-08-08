import { Component, OnInit } from '@angular/core';
import {Payment} from '../../classes/payment';
import {PaymentService} from '../../shared_service/payment.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {Student} from '../../classes/student';
import { faEdit, faMoneyBillWaveAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payments: Payment[];
  public sum: number;
  subscription: Subscription
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faMoneyBillWaveAlt = faMoneyBillWaveAlt;


  constructor(private _paymentService: PaymentService, private _router: Router) {
    this.subscription = _paymentService.RegenerateData$.subscribe(() =>
    this.getPayments()
  );
   }

  ngOnInit(): void {

    this.getPayments();
    this.getAllPaymentsSum();
  }

  getPayments() {
    this._paymentService.getPayments().then(payment =>
      this.payments = payment);
  }

  getAllPaymentsSum() {
    this._paymentService.getAllPaymentsSum().then(sum =>
      this.sum = sum);
  }

  deletePayment(payment: Payment): void {
    this._paymentService.deletePayment(payment).then(
      () => this.getPayments()
    );
  }
  
  newPayment(){
    let payment = new Payment({ 
      svrhaUplate: '',
      vrednostUplate: 0,
      date: null,
      student: new Student({
        cardNumber: '',
        firstName: '',
        lastName: ''
      })
    });
    this._paymentService.setter(payment);
    this._router.navigate(['/payment-form']);
  }

}
