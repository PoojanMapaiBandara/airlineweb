import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {staffService as AuthService} from './staff.service';

@Injectable({
  providedIn: 'root'
})
export class FakeStaffGuardService implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  // tslint:disable-next-line:typedef
  canActivate(){
    if(!this.authService.isAuthenticated()){
      return true;
    }
    this.route.navigate(['staff-dashboard']);
    return false;
  }
}
