import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {adminService} from '../../../services/auth/admin/admin.service';
import {BookingService} from '../../../services/booking/booking.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-ticket-view',
  templateUrl: './admin-ticket-view.component.html',
  styleUrls: ['./admin-ticket-view.component.css']
})
export class AdminTicketViewComponent implements OnInit {

  tickets: Object =  [];
  get admin(): any {
    return localStorage.getItem('adminName');
  }
  constructor(private router: Router, private AdminService: adminService,private Ticket: BookingService ) {
    this.Ticket.getAllBookings().subscribe(data => {
      this.tickets = data;
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
        console.log(resDate);
        window.location.reload();
      }
    );

  }
  onPayment(form: NgForm) {
    const id = form.value.id;
    const pay = form.value.pay;
    this.Ticket.addPayment(id, pay).subscribe(resDate => {
        console.log(resDate);
        window.location.reload();
      }
    );
  }
}
