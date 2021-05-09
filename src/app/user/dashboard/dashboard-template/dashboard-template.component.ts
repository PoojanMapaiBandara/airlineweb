import {Component, Injectable, OnDestroy, OnInit, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { userService } from '../../../services/auth/user/user-service';
import {Subscription} from 'rxjs';
import { FlightService } from '../../../services/flights/flight.service';
import {NgForm} from '@angular/forms';
import {BookingService} from  '../../../services/booking/booking.service';
@Component({
  selector: 'app-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DashboardTemplateComponent implements  OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  flights: Object =  [];
  get user(): any {
    return localStorage.getItem('userName');
  }
  get email(): any {
    return localStorage.getItem('userEmail');
  }
  constructor(private router: Router, private route: ActivatedRoute, private authService: userService, private Flights: FlightService, private Book: BookingService  ) {
    this.Flights.getAllFlights().subscribe(data => {
      this.flights = data;
    });
  }
  ngOnInit(): void  {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  myRoute(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
onLogout(){
    this.authService.logout();
}
  onBook(form: NgForm) {
    if( !form.valid){
      return;
    }
    const flightNumber = form.value.fNumber;
    const FlightName = form.value.fName;
    const date = form.value.fDate;
    const departLocation = form.value.fDLocation;
    const arrivelLocation = form.value.fALocation;
    const departTime = form.value.fDTime;
    const arriveTime = form.value.fATime;
    const ownerEmail = form.value.uEmail;
    const ownerName = form.value.uName;
    const price = form.value.price;
    this.Book.bookTicket(flightNumber, FlightName, date, departLocation, arrivelLocation, departTime, arriveTime, ownerEmail, ownerName,price).subscribe(resDate => {

        console.log(resDate);
        alert('Ticket is Booked Successfully.. Payment is Pending. Please Check Your Email..');
        this.router.navigate(['user-tickets']);
      }
    );
    form.reset();
  }
ngOnDestroy() {
    this.userSub.unsubscribe();
}
}
