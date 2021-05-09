import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { staffService } from '../../services/auth/staff/staff.service';
@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.css']
})
export class StaffRegisterComponent implements OnInit {
  loading = false;
  confirmPw ;
  password = '';
  error: string = null; // if signup error this will load
  constructor(private router: Router, private StaffService: staffService) { }
  myRouter(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
  }
  passwordInput(event: Event){
    this.password = (event.target as HTMLInputElement).value;
  }
  // tslint:disable-next-line:typedef
  passwordRetype(event: Event){
    this.confirmPw = (event.target as HTMLInputElement).value;
  }
  onSubmit(form: NgForm) {
    if( !form.valid){
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const designation = form.value.designation;
    const epf = form.value.epfNumber;
    const password = form.value.password;
    this.StaffService.signup(name, email, designation, epf, password).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
        this.router.navigate(['StaffLogin']);
      },
      // tslint:disable-next-line:no-unused-expression
      errorRes => {
        this.error = errorRes.error.message;
        console.log(errorRes);
      }
    );
    form.reset();
  }

}
