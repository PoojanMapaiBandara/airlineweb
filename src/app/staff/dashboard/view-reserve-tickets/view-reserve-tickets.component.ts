import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {staffService} from '../../../services/auth/staff/staff.service';
import {BookingService} from '../../../services/booking/booking.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-view-reserve-tickets',
  templateUrl: './view-reserve-tickets.component.html',
  styleUrls: ['./view-reserve-tickets.component.css']
})
export class ViewReserveTicketsComponent implements OnInit {
  tickets: Object =  [];
  get staff(): any {
    return localStorage.getItem('staffName');
  }
  constructor(private router: Router, private StaffService: staffService,private Ticket: BookingService ) {
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
    this.StaffService.logout();
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
}
