import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Payment } from '../../classes/payment';
import { Student } from '../../classes/student';
import { StudentService } from "../../shared_service/student.service";
import { PaymentService } from "../../shared_service/payment.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  payment: Payment;
  students: Student[];

  constructor(private route: ActivatedRoute, private studentService: StudentService,
    private paymentService: PaymentService, private location: Location, private _router: Router) {
   this.payment = new Payment({
    svrhaUplate: null,
    vrednostUplate: null,
    date: new Date(),
    student: new Student({
      cardNumber: '',
      firstName: '',
      lastName: ''
    })
   });

 }

 ngOnInit() {

  this.studentService.getStudents().then(students =>
    this.students = students);
}

add(): void {
  if(this.payment.svrhaUplate === null){
    alert("Niste uneli svrhu uplate!");
  }else if(this.payment.vrednostUplate === null){
    alert("Unesite vrednost uplate");
  } else if(this.payment.student.firstName===""){
    alert("Izaberite studenta");
  } else if(isNaN(this.payment.vrednostUplate)){
    alert("Vrednost uplate mora biti broj");
  } else if(this.payment.vrednostUplate < 1){
    alert("Vrednost uplate mora biti veća od 0");
  } else {
  this.paymentService.addPayment(this.payment)
    .then(payment => {
      this.paymentService.announceChange();
      this.goBack();
    });
  }
}

goBack(): void {
  this.location.back();
}

}
