import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Login } from '../../classes/login';
import { LoginService } from "../../shared_service/login.service";
import { ActivatedRoute } from '@angular/router';
import { Authority } from 'src/app/classes/authority';
import { Router } from "@angular/router";
import { faAsterisk, faExclamationTriangle, faSave, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  login: Login;
  faUserPlus = faUserPlus;
  faSave = faSave;
  faTimes = faTimes;
  profileForm: FormGroup;
  faAst = faAsterisk;
  faexclamationTriangle = faExclamationTriangle;

  constructor(private route: ActivatedRoute, private loginService: LoginService,
    private location: Location, private _router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
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


  registerAdmin(): void {
    let value = this.profileForm.value
    this.loginService.registerAdmin(value.username,value.lozinka)
      .then(login => {
        window.location.href = "/";
      });
  }

  goBack(): void {
    this.location.back();
  }

}
