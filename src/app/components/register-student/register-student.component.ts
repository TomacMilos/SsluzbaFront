import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Login } from '../../classes/login';
import { LoginService } from "../../shared_service/login.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { faAsterisk, faExclamationTriangle, faSave, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  login: Login;
  faUserPlus = faUserPlus;
  faSave = faSave;
  faTimes = faTimes;
  profileForm: FormGroup;
  faAst = faAsterisk;
  faexclamationTriangle = faExclamationTriangle;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private formBuilder: FormBuilder,
    private location: Location, private _router: Router) {

  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      lozinka: ['', [Validators.required, Validators.minLength(8)]],
      reLozinka: [''],
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

  registerStudent(): void {
    let value = this.profileForm.value
    this.loginService.registerStudent(value.lozinka, value.ime, value.prezime)
      .then(login => {
        window.location.href = "/";
      });
  }


  goBack(): void {
    this.location.back();
  }

}
