import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {userService} from '../../../services/auth/user/user-service';
import {BookingService} from '../../../services/booking/booking.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  bookings: Object =  [];
  get user(): any {
    return localStorage.getItem('userName');
  }// get users name
  constructor(private router: Router, private route: ActivatedRoute, private authService: userService, private Book: BookingService ) {
    this.Book.getMyBookings().subscribe(data => {
      this.bookings = data;
    });
  }

  ngOnInit(): void {
  }
  myRoute(pageName:string):void{ //route declare with out param
    this.router.navigate([`${pageName}`]);
  }
  addPayment(form: NgForm){
    const tid = form.value.id;
    const tprice = form.value.price;
    this.router.navigate( ['user-tickets-payment', tid, tprice]);
  }
  onLogout(){
    this.authService.logout();
  }
  cancelBook(form: NgForm) {
    if( !form.valid){
      return;
    }
    const phone = form.value.id;
    const state = form.value.state;
    this.Book.cancelBooking(phone, state).subscribe(resDate => {
        console.log(resDate);
        window.location.reload();
      }

    );

  }
}
