import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import { FlightService, FlightResponseData} from '../../../../services/flights/flight.service'
import {staffService} from '../../../../services/auth/staff/staff.service';
@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFlightComponent implements OnInit {
  loading = false;
  flights: Object =  [];
  error = '';
  message = '';
  flightId = this.route.snapshot.paramMap.get('id');
  get staff(): any {
    return localStorage.getItem('staffName');
  }
  constructor(private router: Router, private route: ActivatedRoute, private flightService: FlightService, private StaffService: staffService) {
    this.viewFlight();
  }
viewFlight(){
  this.flightService.getFlight(this.flightId).subscribe(data => {
    this.flights = data;
  });
}
  myRoute(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  onLogout(){
    this.StaffService.logout();
  }
  ngOnInit(): void {
  }
  updateFlight(form: NgForm) {
    if( !form.valid){
      return;
    }
    const name = form.value.fName;
    // tslint:disable-next-line:variable-name
    const number = form.value.fNum;
    const dLoc = form.value.dLoc;
    const aLoc = form.value.aLoc;
    const date = form.value.date;
    const dTime = form.value.dTime;
    const aTime = form.value.aTime;
    const id = form.value.id;
    const pr = form.value.pr;
    this.flightService.updateFlight(number, name, dLoc, aLoc, dTime, aTime, date, id, pr ).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
        this.message = "Updated Succesfully!!"
        this.router.navigate(['staff-dashboard']);
        this.loading = false;
      },
      // tslint:disable-next-line:no-unused-expression
      errorRes => {
        this.error = errorRes.error.message;
        console.log(errorRes);
      }
    );
    form.reset();
  }
}
