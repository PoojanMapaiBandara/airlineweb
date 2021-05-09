import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {staffService} from '../../../../services/auth/staff/staff.service';
import {NgForm} from '@angular/forms';
import {BookingService} from '../../../../services/booking/booking.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  loading = false;
  bookings: Object =  [];
  customerEmail = this.route.snapshot.paramMap.get('email');
  get staff(): any {
    return localStorage.getItem('staffName');
  }
  constructor(private router: Router, private route: ActivatedRoute, private StaffService: staffService, private Ticket: BookingService) {
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
    this.StaffService.logout();
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
}
