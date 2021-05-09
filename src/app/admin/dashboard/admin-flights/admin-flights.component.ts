import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {adminService} from '../../../services/auth/admin/admin.service';
import {FlightService} from '../../../services/flights/flight.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit {
  flights: Object =  [];
  message = '';
  get admin(): any {
    return localStorage.getItem('adminName');
  }

  constructor(private router: Router, private AdminService: adminService,  private Flights: FlightService  ) {
    this.getFlights();
  }
  getFlights(){
    this.Flights.getAllFlights().subscribe(data => {
      this.flights = data;
    });
  }
  onUpdate(form: NgForm){
    const fNum = form.value.fNum;
    this.router.navigate(['admin-update-flight', fNum]);
  }
  ngOnInit(): void {
  }
  myRoute(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  onLogout(){
    this.AdminService.logout();
  }
  onDelete(form: NgForm) {
    const id = form.value.id;
    console.log(id);
    this.Flights.deleteFlight(id).subscribe(resDate => {
        console.log(resDate);
        this.message = 'Flight Deleted Success';
        this.getFlights();
      }
    );
  }
}
