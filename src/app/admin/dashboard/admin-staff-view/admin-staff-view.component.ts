import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {adminService} from '../../../services/auth/admin/admin.service';
import {StaffService} from '../../../services/staff/staff.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-staff-view',
  templateUrl: './admin-staff-view.component.html',
  styleUrls: ['./admin-staff-view.component.css']
})
export class AdminStaffViewComponent implements OnInit {
  staffs: Object =  [];
  message = '';
  loading = false;
  get admin(): any {
    return localStorage.getItem('adminName');
  }
  constructor(private router: Router, private AdminService: adminService, private Staff: StaffService) {
    this.getStaff();
  }
  getStaff(){
    this.Staff.getAllStaff().subscribe(data => {
      this.staffs = data;
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
  deleteStaff(form: NgForm) {
    const id = form.value.id;
    this.Staff.removeStaff(id).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
        this.message = 'Deleted Success';
        this.getStaff();
      }
    );
  }
  updateStaff(form: NgForm){
    const Id = form.value.id;
    this.router.navigate(['admin-update-staff', Id]);
  }
  approveStaff(form: NgForm) {
    const id = form.value.id;
    this.Staff.approveStaff(id).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
        this.message = 'Approved Success';
        this.getStaff();
      }
    );
  }
}
