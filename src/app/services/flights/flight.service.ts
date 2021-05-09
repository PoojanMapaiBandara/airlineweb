import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


const url = 'http://localhost:3000/flights' ;
export interface FlightResponseData{
  FlightName: string;
  flightNumber: string;
  departLocation: string;
  arrivelLocation: string;
  token: string;
  departTime: string;
  arriveTime: string;
  date: string;
  pr: string;
  message: string;

}
@Injectable({
  providedIn: 'root'
})
export class FlightService{
  constructor(private http: HttpClient) {}

  getAllFlights()
  {
    return this.http.get(url);
  }
  getFlight(Fnum: string) {
    return this.http.get(`${url}/findFlightByNumber/${Fnum}`);
  }
  deleteFlight(id: string) {
    return this.http.delete(`${url}/deleteFlight/${id}`);
  }
  updateFlight(fNumber: string, fName: string, dLocation: string, aLoc: string, dTime: string, aTime: string, fDate: string, id: string, pr: string) {
    return this.http.put<FlightResponseData>(`${url}/updateFlight/${id}`,
      {
        FlightName: fName,
        flightNumber: fNumber,
        departLocation: dLocation,
        arrivelLocation: aLoc,
        departTime: dTime,
        arriveTime: aTime,
        date: fDate,
        price: pr,
        token: true
      });


  }
  addFlight(fNumber: string, fName: string, dLocation: string, aLoc: string, dTime: string, aTime: string, fDate: string, pr: string) {
    return this.http.post<FlightResponseData>(`${url}/addFlight/`,
      {
        FlightName: fName,
        flightNumber: fNumber,
        departLocation: dLocation,
        arrivelLocation: aLoc,
        departTime: dTime,
        arriveTime: aTime,
        date: fDate,
        price: pr,
        token: true
      });


  }
}
