import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Airport} from "../../common/airport";
import {Flight} from "../../common/flight";
import {ActivatedRoute, Router} from "@angular/router";
import {FlightService} from "../../services/flight.service";
import {AirportService} from "../../services/airport.service";
@Component({
  selector: 'app-flight-update',
  templateUrl: './flight-update.component.html',
  styleUrls: ['./flight-update.component.css']
})
export class FlightUpdateComponent implements OnInit {

  flightsForm: FormGroup;
  flightClasses: string[] = [
    "ECONOMY", "BUSINESS", "PREMIUM", "FIRST"
  ];

  airports: Airport[] = [];

  constructor(private flightService: FlightService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private airportService: AirportService, private router: Router) { }

  id: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.getAirports();
    this.flightService.getFlightById(this.id).subscribe(item => {
      this.flightsForm = this.formBuilder.group({
        departureAirport: new FormControl(item.departureAirport),
        arrivalAirport: new FormControl(item.arrivalAirport),
        departureDate: new FormControl(item.departureDate),
        capacity: new FormControl(item.capacity),
        flightPrice: new FormControl(item.flightPrice),
        flightClass: new FormControl(item.flightClass)
      });
    });
  }


  getAirports(){
    this.airportService.getAirports().subscribe(data => {
      this.airports = data
    });
  }

   onFlightSubmit(){
    let flight: Flight = this.flightsForm.value;
    flight.id = this.id;
    this.flightService.updateFlight(flight).subscribe({
      next: () => this.router.navigateByUrl("/admin"),
      error: err => console.log(err)
    });
  }

}
