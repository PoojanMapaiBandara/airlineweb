import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';



// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://airline-api.herokuapp.com';

export interface AuthResponseData{
  name: string;
  email: string;
  id: string;
  Usertype: string;
  token: string;
  phone: string;
  nic: string;
  country: string;
  message: string;

}
@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class userService {
  user = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) {
  }


  signup(name: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(`${baseUrl}/auth/signup`,
      {
        name: name,
        email: email,
        password: password,
        token: true
      });


  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${baseUrl}/auth/customerLogin`,
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
            resData.phone,
            resData.country,
            resData.nic,
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
    phone: string,
    country: string,
    nic: string,
    token: string
  ) {
    const user = new User(email, userId, name, Usertype, phone, country, nic, token);
    const UserName = name;
    const UserEmail = email;
    const UserPhone = phone;
    const UserCountry = country;
    const UserNic = nic;
    this.user.next(user); // send value to the user model
    localStorage.setItem('userData', JSON.stringify(user)); // this will store user details in our web browser . sessions and cookies
    localStorage.setItem('userName', UserName);
    localStorage.setItem('userEmail', UserEmail);
    localStorage.setItem('userPhone', UserPhone);
    localStorage.setItem('userCountry', UserCountry);
    localStorage.setItem('userNic', UserNic);
  }
  public isAuthenticated(): Boolean {
    const userData = localStorage.getItem('userData');
    if (userData && JSON.parse(userData) ){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  // logout and session will distory
  logout(){
    this.user.next(null);
    this.router.navigate(['/landing-page']);
    localStorage.removeItem('userData'); // erase browser cache related to your login
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userCountry');
    localStorage.removeItem('userNic');
  }
  // update add user details route call
  updateUser( phone: string, country: string, nic: string, email: string) {
    return this.http.put<AuthResponseData>(`${baseUrl}/users/addCustomerDetails/${email}`,
      {
        phone: phone,
        country: country,
        nic: nic
      });


  }
}
