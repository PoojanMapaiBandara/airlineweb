import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlightService} from '../../../../services/flights/flight.service';
import {adminService} from '../../../../services/auth/admin/admin.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-flight-update',
  templateUrl: './admin-flight-update.component.html',
  styleUrls: ['./admin-flight-update.component.css']
})
export class AdminFlightUpdateComponent implements OnInit {

  loading = false;
  flights: Object =  [];
  error = '';
  message = '';
  flightId = this.route.snapshot.paramMap.get('id');
  get admin(): any {
    return localStorage.getItem('adminName');
  }
  constructor(private router: Router, private route: ActivatedRoute, private flightService: FlightService, private AdminService: adminService) {
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
    this.AdminService.logout();
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
        this.router.navigate(['admin-view-flight']);
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
