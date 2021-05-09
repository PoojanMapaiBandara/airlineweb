import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { adminService } from '../../../../services/auth/admin/admin.service';
import {BookingService} from '../../../../services/booking/booking.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-customer-update',
  templateUrl: './admin-customer-update.component.html',
  styleUrls: ['./admin-customer-update.component.css']
})
export class AdminCustomerUpdateComponent implements OnInit {
  loading = false;
  bookings: Object =  [];
  customerEmail = this.route.snapshot.paramMap.get('email');
  get admin(): any {
    return localStorage.getItem('adminName');
  }
  constructor(private router: Router, private route: ActivatedRoute, private AdminService: adminService, private Ticket: BookingService) {
    this.Ticket.getCustomerBookings(this.customerEmail).subscribe(data => {
      this.bookings = data;
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
  onCancel(form: NgForm) {
    const id = form.value.id;
    const state = form.value.state;
    this.Ticket.cancelBooking(id, state).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
        window.location.reload();
      }
    );

  }
  onPayment(form: NgForm) {
  const id = form.value.id;
  const pay = form.value.pay;
  this.Ticket.addPayment(id, pay).subscribe(resDate => {
  this.loading = true;
  console.log(resDate);
  window.location.reload();
}
);
}
}
