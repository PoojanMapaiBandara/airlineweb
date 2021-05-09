import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {userService} from '../../../services/auth/user/user-service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-update-customer-details',
  templateUrl: './update-customer-details.component.html',
  styleUrls: ['./update-customer-details.component.css']
})
export class UpdateCustomerDetailsComponent implements OnInit {
  loading = false;
  get user(): any {
    return localStorage.getItem('userName');
  }
  get email(): any {
    return localStorage.getItem('userEmail');
  }
  get phone(): any {
    return localStorage.getItem('userPhone');
  }
  get country(): any {
    return localStorage.getItem('userCountry');
  }
  get nic(): any {
    return localStorage.getItem('userNic');
  }
  constructor(private router: Router, private route: ActivatedRoute,  private authService: userService) { }

  ngOnInit(): void {
  }
  myRoute(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  updateUser(form: NgForm) {
    if( !form.valid){
      return;
    }
    const phone = form.value.phone;
    const country = form.value.country;
    const nic = form.value.nic;
    this.authService.updateUser( phone, country, nic, this.email).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
      this.onLogout();
      }

    );
    form.reset();
  }
  onLogout(){
    this.authService.logout();
  }
}
