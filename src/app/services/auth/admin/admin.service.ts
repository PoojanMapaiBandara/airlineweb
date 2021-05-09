import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Admin } from './admin.model';
import {tap} from 'rxjs/operators';



//const baseUrl = 'http://localhost:3000';

const baseUrl = 'https://airline-api.herokuapp.com';


export interface AdminAuthResponseData{
  email: string;
  type: string;
  token: string;
  message: string;

}
@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class adminService {
  admin = new Subject<Admin>();

  constructor(private http: HttpClient, private router: Router) {
  }



  login(email: string, password: string) {
    return this.http.post<AdminAuthResponseData>(`${baseUrl}/auth/adminLogin/`,
      {
        email: email,
        password: password,
        token: true
      })
      .pipe(
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.type,
            resData.token
          );
        })
      );
  }

  // tslint:disable-next-line:typedef
  private handleAuthentication(
    email: string,
    type: string,
    token: string
  ) {
    const admin = new Admin(email,  type, token);
    const adminEmail = email;

      this.admin.next(admin); // send value to the user model
      localStorage.setItem('adminData', JSON.stringify(admin)); // this will store user details in our web browser . sessions and cookies
      localStorage.setItem('adminName', adminEmail);



  }
  public isAuthenticated(): Boolean {
    const adminData = localStorage.getItem('adminData');
    if (adminData && JSON.parse(adminData) ){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  // logout and session will distory
  logout(){
    this.admin.next(null);
    this.router.navigate(['/landing-page']);
    localStorage.removeItem('adminData'); // erase browser cache related to your login
    localStorage.removeItem('adminEmail');

  }

}
