import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {userService as AuthService} from './user-service';

@Injectable({
  providedIn: 'root'
})
export class FakeGuardService implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  // tslint:disable-next-line:typedef
  canActivate(){
    if(!this.authService.isAuthenticated()){
      return true;
    }
    this.route.navigate(['user-dashboard']);
    return false;
  }
}
