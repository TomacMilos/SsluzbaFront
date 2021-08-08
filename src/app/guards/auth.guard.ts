import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../shared_service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private _router: Router){}
              
  canActivate(): boolean{
    if(this.loginService.loggedIn()){
      return true
    }else{
      this._router.navigate(['/']);
      return false
    }
  }
  
}