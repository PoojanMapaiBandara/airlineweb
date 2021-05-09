import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponseData} from '../auth/user/user-service';

// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://airline-api.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) {
  }

  bookTicket(fNumber: string, fName: string, date: string, dLocation: string,
             aLocation: string, dTime: string, aTime: string, oEmail: string, oName: string, price: string) {
    return this.http.post<AuthResponseData>(`${baseUrl}/ticket/bookTicket`,
      {
        ownerName: oName,
        ownerEmail: oEmail,
        FlightName: fName,
        flightNumber: fNumber,
        departLocation: dLocation,
        arrivelLocation: aLocation,
        departTime: dTime,
        arriveTime: aTime,
        date: date,
        price: price,
        token: true
      });
  }

  getMyBookings() {
    const email = localStorage.getItem('userEmail');
    return this.http.get(`${baseUrl}/ticket/myTickets/${email}`);
  }

  cancelBooking(id: string, state: string) {
    return this.http.put(`${baseUrl}/ticket/canselTicket/${id}`,
      {
        status: state,
      });
  }
  addPayment(id: string, pay: string) {
    return this.http.put(`${baseUrl}/ticket/ticketPayment/${id}`,
      {
        payment: pay,
      });
  }
  getAllBookings() {
    return this.http.get(`${baseUrl}/ticket/tickets/`);
  }
  getTicket(id: string) {
    return this.http.get(`${baseUrl}/ticket/getTicket/${id}`);
  }
  getCustomerBookings(email: string) {
    return this.http.get(`${baseUrl}/ticket/myTickets/${email}`);
  }
}
