import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, NgForm} from '@angular/forms';
import { staffService } from '../../services/auth/staff/staff.service';
import {Observable} from 'rxjs';
import {StaffAuthResponseData} from '../../services/auth/staff/staff.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent implements OnInit {
  loading = false;
  error: string = null;
  emailIsEmpty = '';
  passwordIsEmpty = '';

  constructor(private router:Router, private staffService: staffService){}
  myRoute(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

// tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    if( !form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<StaffAuthResponseData>;
    authObs =  this.staffService.login( email, password);

    authObs.subscribe(
      resData => {
        console.log(resData.status);
        this.loading = false;
        if( resData.status  === 'verified'){
          this.router.navigate(['staff-dashboard']);
        }
        else {
          this.error = "Your Account is not Verified yet. Please Contact the Admin.";
        }
      },
      // tslint:disable-next-line:no-unused-expression
      errorRes => {
        this.error = errorRes.error.message;
        console.log(errorRes);
      }
    );
    form.reset();
  }

  emailInput(event: Event){
    this.emailIsEmpty = (event.target as HTMLInputElement).value;
  }
  // tslint:disable-next-line:typedef
  passwordInput(event: Event){
    this.passwordIsEmpty = (event.target as HTMLInputElement).value;
  }
  ngOnInit(): void {
  }

}
