import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlightService} from '../../../../services/flights/flight.service';
import {staffService} from '../../../../services/auth/staff/staff.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  loading = false;
  error = '';
  message = '';
  get staff(): any {
    return localStorage.getItem('staffName');
  }
  constructor(private router: Router, private flightService: FlightService, private StaffService: staffService) { }

  ngOnInit(): void {
  }
  myRoute(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  addFlight(form: NgForm) {
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
    const pr = form.value.pr;
    this.flightService.addFlight(number, name, dLoc, aLoc, dTime, aTime, date, pr ).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
        this.message = 'Flight Added Successfully..';
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
  onLogout(){
    this.StaffService.logout();
  }
}

