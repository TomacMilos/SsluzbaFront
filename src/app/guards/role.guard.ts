import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../shared_service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private loginService: LoginService, 
    private _router: Router) {}

    canActivate(next:ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if(this.loginService.loggedIn()){
        let roles = next.data['roles'] as Array<string>;
        if(roles){
          var match = this.loginService.isAuthorized(roles);
          if(match) return true;
          else{
            var roleUlogovanog = this.loginService.getRole();
            if(roleUlogovanog === "ADMIN"){
                this._router.navigate(['/students']);

              return false;
            }else if(roleUlogovanog === "NASTAVNIK"){
              this._router.navigate(['/teacher-page']);
              return false;
            }else if(roleUlogovanog === "STUDENT"){
              this._router.navigate(['student-page']);
              return false;
            }
            
            return false;
          }
        }else
          return true;
      }
      this._router.navigate(['/']);
      return false;
    }
  
}