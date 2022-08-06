import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Flight} from "../common/flight";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private httpClient: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>('http://localhost:8080/flights');
  }

  getFlightById(id: number): Observable<Flight> {
    return this.httpClient.get<Flight>(`http://localhost:8080/flights/`+id);
  }

  addFlight(flight: Flight): Observable<Flight> {
    return this.httpClient.post<Flight>(`http://localhost:8080/flights`, flight);
  }

  deleteFlight(id: number): Observable<Flight> {
    return this.httpClient.delete<Flight>(`http://localhost:8080/flights/`+id);
  }

    getFlightsFiltered(departureAirportId: string, arrivalAirportId: string, departureDate: string, goodDateReturn: string, isBiDirectional: boolean): Observable<Flight[]>{
    const searchFlightUrl = 'http://localhost:8080/search/flights';
    return this.httpClient.get<Flight[]>(searchFlightUrl+`?departureAirportId=${departureAirportId}&arrivalAirportId=${arrivalAirportId}&departureDate=${departureDate}&isBiDirectional=${isBiDirectional}&returnDate=${goodDateReturn}`);
  }

  updateFlight(flight: Flight) {
    return this.httpClient.put<Flight>(`http://localhost:8080/flights`, flight)
  }

  bulkCreateFlights(data: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:8080/flights/bulk-create', data, {responseType: 'text'});
  }
}
