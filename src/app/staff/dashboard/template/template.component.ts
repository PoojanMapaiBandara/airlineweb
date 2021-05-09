import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { staffService } from  '../../../services/auth/staff/staff.service';
import { FlightService } from '../../../services/flights/flight.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  flights: Object =  [];
  message = '';
  get staff(): any {
    return localStorage.getItem('staffName');
  }
  get email(): any {
    return localStorage.getItem('staffEmail');
  }
  constructor(private router: Router, private StaffService: staffService,  private Flights: FlightService  ) {
    this.getFlights();
  }
  getFlights(){
    this.Flights.getAllFlights().subscribe(data => {
      this.flights = data;
    });
  }
  onUpdate(form: NgForm){
    const fNum = form.value.fNum;
    this.router.navigate(['staff-update-flight', fNum]);
  }
  ngOnInit(): void {
  }
  myRoute(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  onLogout(){
    this.StaffService.logout();
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
