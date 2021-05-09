import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {staffService} from '../../../services/auth/staff/staff.service';
import {CustomerService } from  '../../../services/customers/customer.service';
import {NgForm} from '@angular/forms';
import {BookingService} from '../../../services/booking/booking.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  customers: Object =  [];
  message = '';
  loading = false;
  get staff(): any {
    return localStorage.getItem('staffName');
  }
  constructor(private router: Router, private StaffService: staffService, private Customers: CustomerService) {
    this.getUsers();
  }
getUsers(){
  this.Customers.getAllCustomers().subscribe(data => {
    this.customers = data;
  });
}
  ngOnInit(): void {
  }
  myRoute(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  onLogout(){
    this.StaffService.logout();
  }
  deleteCustomer(form: NgForm) {
    const id = form.value.id;
    this.Customers.removeCustomer(id).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
        this.message = 'Deleted Success';
      this.getUsers();
      }
    );
  }
  viewCustomerBookings(form: NgForm){
    const email = form.value.email;
      this.router.navigate(['staff-view-customer', email]);
      }

}
