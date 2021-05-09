import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { userService, AuthResponseData } from '../../services/auth/user/user-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  emailIsEmpty = '';
  passwordIsEmpty = '';
  error: string = null; // if signup error this will load
  constructor(private router: Router, private userService: userService ){}
  onSubmit(form: NgForm) {
    if( !form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    authObs =  this.userService.login( email, password);

    authObs.subscribe(
      resData => {
        console.log(resData.name);
        this.loading = false;
        this.router.navigate(['user-dashboard']);
      },
      // tslint:disable-next-line:no-unused-expression
      errorRes => {
        this.error = errorRes.error.message;
        console.log(errorRes);
      }
    );
    form.reset();
  }


// redrect to signup page
  UserSignUp(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
  }

  emailInput(event: Event){
    this.emailIsEmpty = (event.target as HTMLInputElement).value;
  }
  // tslint:disable-next-line:typedef
  passwordInput(event: Event){
    this.passwordIsEmpty = (event.target as HTMLInputElement).value;
  }
}
