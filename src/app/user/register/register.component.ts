import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup,  NgForm} from '@angular/forms';
import { userService } from '../../services/auth/user/user-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  loginForm: FormGroup;
  user = {
    name : '',
    email : '',
    password : '',

  };
  error: string = null; // if signup error this will load
  confirmPw ;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private router: Router, private userService: userService){}
  userLogin(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef

  // tslint:disable-next-line:typedef
  emailInput(event: Event){
    this.user.email = (event.target as HTMLInputElement).value;
  }
  // tslint:disable-next-line:typedef
  passwordInput(event: Event){
    this.user.password = (event.target as HTMLInputElement).value;
  }
  // tslint:disable-next-line:typedef
  passwordRetype(event: Event){
    this.confirmPw = (event.target as HTMLInputElement).value;
  }
  // tslint:disable-next-line:typedef
  nameInput(event: Event){
    this.user.name =  (event.target as HTMLInputElement).value;
  }
  onSubmit(form: NgForm) {
    if( !form.valid){
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    this.userService.signup(name, email, password).subscribe(resDate => {
      this.loading = true;
      console.log(resDate);
      this.router.navigate(['userLogin']);
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
