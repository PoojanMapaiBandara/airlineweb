import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {adminService} from '../../../../services/auth/admin/admin.service';
import {StaffService} from '../../../../services/staff/staff.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-update-staff',
  templateUrl: './admin-update-staff.component.html',
  styleUrls: ['./admin-update-staff.component.css']
})
export class AdminUpdateStaffComponent implements OnInit {
  error = '';
  message = '';
  loading = false;
  staff: Object =  [];
  staffId = this.route.snapshot.paramMap.get('id');
  get admin(): any {
    return localStorage.getItem('adminName');
  }
  constructor(private router: Router, private route: ActivatedRoute, private AdminService: adminService, private staffService: StaffService) {
    this.getStaff();
  }
getStaff(){
  this.staffService.getStaffMember(this.staffId).subscribe(data => {
    this.staff = data;
    console.log(data);
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
  onUpdate(form: NgForm) {
    const id = form.value.id;
    const name = form.value.name;
    const phone = form.value.phone;
    const epfNumber = form.value.epf;
    const des = form.value.des;
    const pass = form.value.pass;
    this.staffService.UpdateStaff(id, name, phone, epfNumber, des, pass).subscribe(resDate => {
        this.loading = true;
        console.log(resDate);
      this.message = "Updated Succesfully!!"
      this.getStaff();
      }
    );

  }

}
