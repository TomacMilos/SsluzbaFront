import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Login } from '../../classes/login';
import { LoginService } from "../../shared_service/login.service";
import { ActivatedRoute } from '@angular/router';
import { Authority } from 'src/app/classes/authority';
import { Teacher } from 'src/app/classes/teacher';
import { Router } from "@angular/router";
import { faAsterisk, faExclamationTriangle, faSave, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {

  faUserPlus = faUserPlus;
  faSave = faSave;
  faTimes = faTimes;
  profileForm: FormGroup;
  faAst = faAsterisk;
  faexclamationTriangle = faExclamationTriangle;
  ranks : any;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private formBuilder: FormBuilder,
   private location: Location, private _router: Router) {
 }

  ngOnInit(): void {
    this.ranks = ["Profesor", "Asistent", "Demonstrator" ];
    this.profileForm = this.formBuilder.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      uloga: ['', Validators.required],
      korisnickoIme: ['', Validators.required],
      lozinka: ['', [Validators.required, Validators.minLength(8)]],
      reLozinka: ['',],
    }, { validator: this.MustMatch('lozinka', 'reLozinka') });

  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  registerTeacher(): void {
    let value = this.profileForm.value
    this.loginService.registerTeacher(value.korisnickoIme, value.lozinka,
      value.ime, value.prezime, value.uloga)
      .then(login => {
        window.location.href = "/teachers";
      });
  }

  goBack(): void {
    this.location.back();
  }

}
