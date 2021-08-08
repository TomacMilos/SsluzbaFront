import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector: Injector) { }

  intercept(req, next){
    let korService = this.injector.get(LoginService);
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${korService.getToken()}`
      }
    })
    return next.handle(tokenizedRequest);
  }
}