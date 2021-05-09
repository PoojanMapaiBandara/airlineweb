import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {userService} from '../../../services/auth/user/user-service';
import {FlightService} from '../../../services/flights/flight.service';
import {NgForm} from '@angular/forms';
import {BookingService} from '../../../services/booking/booking.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  loading = false;
  error: string = null;
  get user(): any {
    return localStorage.getItem('userName');
  }
  get email(): any {
    return localStorage.getItem('userEmail');
  }
  flights: Object =  [];
  constructor(private router: Router, private route: ActivatedRoute,  private authService: userService, private Flights: FlightService, private Book: BookingService ) {}
  // tslint:disable-next-line:typedef
  searchFlight(form: NgForm) {
    if( !form.valid){
      return;
    }
    const Fnum = form.value.fNum;

    this.Flights.getFlight(Fnum).subscribe(resDate => {
        this.loading = true;
        this.error = null;
        this.flights = resDate;
        this.loading = false;
      },
      // tslint:disable-next-line:no-unused-expression
      errorRes => {
      this. flights =  [];
        this.error = errorRes.error.message;
        console.log(errorRes);
      }
    );
  }

  ngOnInit(): void {
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
    console.log('bla' + flightNumber, FlightName, date);
    this.Book.bookTicket(flightNumber, FlightName, date, departLocation, arrivelLocation, departTime, arriveTime, ownerEmail, ownerName,price).subscribe(resDate => {

        console.log(resDate);
        this.router.navigate(['user-tickets']);
      }
    );
    form.reset();
  }
}
