import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private token:TokenService,private route:Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.token.isLogger()) {
      if (this.token.getRole() == 'ROLE_ADMIN' || this.token.getRole() == 'ROLE_EMPLOYEE') {
        return  true;
      }else {
        this.route.navigate(['/error'])
        return false;
      }
    } else {
      this.route.navigate(['/error'])
      return false;
    }
  }

}
