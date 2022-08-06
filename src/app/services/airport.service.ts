import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Airport} from "../common/airport";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private httpClient: HttpClient) { }

  getAirports(): Observable<Airport[]>{
    return this.httpClient.get<Airport[]>("http://localhost:8080/airports");
  }

  addAirport(airport: Airport): Observable<Airport> {
    return this.httpClient.post<Airport>("http://localhost:8080/airports", airport);
  }

  deleteAirport(id: number): Observable<Airport> {
    return this.httpClient.delete<Airport>(`http://localhost:8080/airports/`+id);
  }

  getAirportById(id: number): Observable<Airport> {
    return this.httpClient.get<Airport>(`http://localhost:8080/airports/`+id)
  }

  bulkCreateAirports(formData: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:8080/airports/bulk-create', formData, {responseType: 'text'})
  }

  updateAirport(airport: Airport) {
    return this.httpClient.put<Airport>(`http://localhost:8080/airports`, airport)
  }
}
