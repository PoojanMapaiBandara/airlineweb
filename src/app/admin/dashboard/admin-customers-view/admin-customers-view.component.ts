import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { adminService } from '../../../services/auth/admin/admin.service';
import {CustomerService} from '../../../services/customers/customer.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-customers-view',
  templateUrl: './admin-customers-view.component.html',
  styleUrls: ['./admin-customers-view.component.css']
})
export class AdminCustomersViewComponent implements OnInit {
  customers: Object =  [];
  message = '';
  loading = false;
  get admin(): any {
    return localStorage.getItem('adminName');
  }
  constructor(private router: Router, private AdminService: adminService, private Customers: CustomerService) {
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
    this.AdminService.logout();
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
    this.router.navigate(['admin-view-customer', email]);
  }

}
