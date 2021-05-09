import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const url = 'http://localhost:3000/users' ;
@Injectable({
  providedIn: 'root'
})
export class StaffService{
  constructor(private http:HttpClient) {}

  getAllStaff()
  {
    return this.http.get(`${url}/`);
  }
  removeStaff(id: string) {
    return this.http.delete(`${url}/deleteStaff/${id}`);
  }
  approveStaff(id: string) {
    return this.http.put(`${url}/approveStaff/${id}`,
      {
        status: 'verified',
      });
  }
  getStaffMember(id: string){
    return this.http.get(`${url}/staff/${id}`);
  }
  UpdateStaff(id: string, name: string, phone: string, epfNumber: string, des: string, pass: string) {
    return this.http.put(`${url}/updateStaff/${id}`,
      {
        name: name,
        phone: phone,
        epfNumber: epfNumber,
        designation: des,
        password: pass,
      });
  }

}
