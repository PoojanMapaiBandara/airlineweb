import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {adminService , AdminAuthResponseData} from '../../services/auth/admin/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loading = false;
  error: string = null;
  emailIsEmpty = '';
  passwordIsEmpty = '';

  constructor(private router: Router, private AdminService: adminService){}
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

    let authObs: Observable<AdminAuthResponseData>;
    authObs =  this.AdminService.login( email, password);

    authObs.subscribe(
      resData => {
        console.log(resData.type);
        this.loading = false;
          this.router.navigate(['admin-view-flight']);

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
