import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponseData} from '../auth/user/user-service';

const url = 'http://localhost:3000/users' ;
@Injectable({
  providedIn: 'root'
})
export class CustomerService{
  constructor(private http:HttpClient) {}

  getAllCustomers()
  {
    return this.http.get(`${url}/allUsers/`);
  }
  removeCustomer(id: string) {
    return this.http.delete(`${url}/deleteCustomer/${id}`);
  }

}
