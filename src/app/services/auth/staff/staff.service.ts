import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Staff} from './staff.model';
import {tap} from 'rxjs/operators';



// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://airline-api.herokuapp.com';

export interface StaffAuthResponseData{
  name: string;
  email: string;
  id: string;
  Usertype: string;
  token: string;
  epfNumber: string;
  nic: string;
  status: string;
  designation: string;
  message: string;

}
@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class staffService {
  staff = new Subject<Staff>();

  constructor(private http: HttpClient, private router: Router) {
  }


  signup(name: string, email: string, designation: string, epfNumber: string, password: string) {
    return this.http.post<StaffAuthResponseData>(`${baseUrl}/auth/addStaff`,
      {
        name: name,
        email: email,
        epfNumber: epfNumber,
        designation: designation,
        password: password,
        token: true
      });


  }

  login(email: string, password: string) {
    return this.http.post<StaffAuthResponseData>(`${baseUrl}/auth/staffLogin/`,
      {
        email: email,
        password: password,
        token: true
      })
      .pipe(
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.id,
            resData.name,
            resData.Usertype,
            resData.epfNumber,
            resData.designation,
            resData.nic,
            resData.status,
            resData.token
          );
        })
      );
  }

  // tslint:disable-next-line:typedef
  private handleAuthentication(
    email: string,
    userId: string,
    name: string,
    Usertype: string,
    epfNumber: string,
    designation: string,
    nic: string,
    status: string,
    token: string
  ) {
    const staff = new Staff(email, userId, name, Usertype, epfNumber, designation, nic, status, token);
    const StaffName = name;
    const staffStatus = status;
    if(staffStatus === 'verified')
    {
      this.staff.next(staff); // send value to the user model
      localStorage.setItem('staffData', JSON.stringify(staff)); // this will store user details in our web browser . sessions and cookies
      localStorage.setItem('staffName', StaffName);
      localStorage.setItem('staffStatus', staffStatus);
    }


  }
  public isAuthenticated(): Boolean {
    const staffData = localStorage.getItem('staffData');
    if (staffData && JSON.parse(staffData) ){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  // logout and session will distory
  logout(){
    this.staff.next(null);
    this.router.navigate(['/landing-page']);
    localStorage.removeItem('staffData'); // erase browser cache related to your login
    localStorage.removeItem('staffName');
    localStorage.removeItem('staffStatus');
  }

}
