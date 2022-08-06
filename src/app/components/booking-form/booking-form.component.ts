import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Booking} from "../../common/booking";
import {AuthService} from "../../services/auth.service";
import {User} from "../../common/user";
import {AlertComponent} from "../alert/alert.component";
import {Passenger} from "../../common/passenger";
import {Flight} from "../../common/flight";
import {FlightService} from "../../services/flight.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {BehaviorSubject, Subject} from "rxjs";


@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  bookingForm: FormGroup;
  total: Subject<number> = new Subject<number>();

  realTotal: number;

  passengerFirstName: string;
  passengerLastName: string;
  passengerPassportCode: string;
  passengerAddress: string;
  passengerType: string;

  step: number = 1;
  passengers: Passenger[] = [];

  flight: Flight;
  id: number = -1;

  user: User;
  checkin: boolean;
  spin: boolean;

  constructor(private bookingService: BookingService, private router: Router,
              private snackbar: MatSnackBar, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private authService: AuthService,
              private flightService: FlightService) { }

  ngOnInit(): void {
    this.getAuthUser();
    this.getFlight();
    this.total.subscribe(res => this.realTotal = res);
    this.bookingForm = this.formBuilder.group({
      baggage: ['CARRY_ON'],
    });
  }

  getAuthUser() {
    this.authService.userLoggedIn.subscribe({
      next: (user) => this.user = user,
      error: (err) => this.snackbar.openFromComponent(AlertComponent, {
        data: err,
        duration: 2000
      })
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
      this.step++;
      let passenger: Passenger = new Passenger();
      passenger.firstName = this.passengerFirstName;
      passenger.lastName = this.passengerLastName;
      passenger.address = this.passengerAddress;
      passenger.passportCode = this.passengerPassportCode;
      passenger.passengerType = this.passengerType;
      this.passengers.push(passenger);
      this.passengerFirstName = '';
      this.passengerLastName = '';
      this.passengerAddress = '';
      this.passengerPassportCode = '';
      this.passengerType = '';
  }

  private getFlight() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.flightService.getFlightById(this.id).subscribe(data =>{
      this.flight = data;
    });
  }

  onBook(){
    let booking: Booking = new Booking();
    booking.flight = this.flight;
    booking.passengers = this.passengers;
    booking.checkedIn = this.checkin;
    booking.baggage = this.bookingForm.get('baggage').value;
    this.passengers.length > 0 ? this.flight.flightPrice *= this.passengers.length : this.flight.flightPrice;
    this.checkin ? this.flight.flightPrice += this.flight.flightPrice * 0.05 : this.flight.flightPrice
    booking.baggage === 'CHECKED' ? this.flight.flightPrice += 35 : this.flight.flightPrice;
    if (this.user){
      this.spin = true;
      this.bookingService.book(booking).subscribe({
        next: () => {
          this.router.navigateByUrl("/home").then(r => console.log(r))
          this.snackbar.openFromComponent(AlertComponent, {
            data: 'Your booking was submitted successfully.',
            duration: 2500
          });
        },
        error: (err) => {
          this.snackbar.openFromComponent(AlertComponent, {
            data: err,
            duration: 2000
          });
          console.log(err);
        }
      });
    }
  }

  checkInOnline(event: MatCheckboxChange) {
      this.checkin = event.checked;
        this.computeTotal();
  }

  computeTotal(){
    let checkinPrice: number = 0;
    if (this.checkin){
      checkinPrice += this.flight.flightPrice * this.passengers.length + (this.flight.flightPrice * this.passengers.length) * 0.05;
      if (this.bookingForm.get('baggage').value === 'CHECKED'){
        checkinPrice += 35;
      }
      this.total.next(checkinPrice);
    } else {
      this.total.next(this.flight.flightPrice * this.passengers.length);
    }

  }
}
