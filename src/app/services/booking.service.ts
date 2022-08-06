import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, Subject} from "rxjs";
import {Booking} from "../common/booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private httpClient: HttpClient, private router: Router, private snackbar: MatSnackBar) { }

  getBookingsByUser(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`http://localhost:8080/bookings/my-bookings`);
  }

  getAllBookings(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/bookings');
  }

  book(booking: Booking): Observable<any> {
    return this.httpClient.post('http://localhost:8080/bookings', booking);
  }

  cancelBooking(id: number): Observable<any>{
    return this.httpClient.delete('http://localhost:8080/bookings/'+id, {responseType: 'text'});
  }

  getBookingById(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/bookings/'+id);
  }

}
