import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Booking} from "../../common/booking";
import {User} from "../../common/user";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking[] = [];
  user: User;
  panelOpenState = false;

  constructor(private bookingService: BookingService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(){
    this.bookingService.getBookingsByUser().subscribe({
      next: (response) =>{
        this.bookings = response;
      },
    });
  }

  cancelBooking(id: number){
    this.bookingService.cancelBooking(id).subscribe({
      next: (res) => {
        this.bookings.splice(id,1);
        this.snackbar.openFromComponent(AlertComponent, {
          data: res,
          duration: 2000
        });
      }
    })
  }
}
