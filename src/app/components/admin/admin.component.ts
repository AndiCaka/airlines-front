import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Airport} from "../../common/airport";
import {map, Observable, startWith} from "rxjs";
import {Flight} from "../../common/flight";
import {FlightService} from "../../services/flight.service";
import {AirportService} from "../../services/airport.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  airportsForm: FormGroup;
  flightsForm: FormGroup;

  file?:File;
  fileList?:FileList;

  departureOptions: Observable<Airport[]>;
  arrivalOptions: Observable<Airport[]>;

  flightClasses: string[] = [
    "ECONOMY", "BUSINESS", "PREMIUM", "FIRST"
  ];

  airports: Airport[] = [];
  flights: Flight[] = [];

  constructor(private formBuilder: FormBuilder, private flightService: FlightService,
              private router: Router, private airportService: AirportService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.getAirports();
    this.getFlights();
    this.airportsForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      airportCode: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.pattern('[A-Z]{3}')]),
      city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      flagUrl: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    this.flightsForm = this.formBuilder.group({
      departureAirport: new FormControl('', [Validators.required]),
      arrivalAirport: new FormControl('', [Validators.required]),
      departureDate: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
      flightPrice: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
      flightClass: new FormControl('', [Validators.required])
    });

    this.departureOptions = this.flightsForm.get('departureAirport').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.arrivalOptions = this.flightsForm.get('arrivalAirport').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value:  string): Airport[] {
    return this.airports.filter(option => option.name.toLowerCase().includes(value));
  }

  onFlightSubmit(){
    let flight = new Flight();
    flight.departureAirport = this.flightsForm.get('departureAirport').value;
    flight.arrivalAirport = this.flightsForm.get('arrivalAirport').value;
    flight.departureDate = this.flightsForm.get('departureDate').value;
    flight.flightClass = this.flightsForm.get('flightClass').value;
    flight.flightPrice = this.flightsForm.get('flightPrice').value;
    flight.capacity = this.flightsForm.get('capacity').value;
    console.log(JSON.stringify(flight));
    this.flightService.addFlight(flight).subscribe({
      next: () => {
        this.flightsForm.reset();
          this.flights.push(flight);
      },
      error: err => console.log(err),
    });
  }

  onAirportSubmit(){
    let airport: Airport = new Airport();
    airport.name = this.airportsForm.get('name').value;
    airport.airportCode = this.airportsForm.get('airportCode').value;
    airport.city = this.airportsForm.get('city').value;
    airport.flagUrl = this.airportsForm.get('flagUrl').value;
    this.airportService.addAirport(airport).subscribe({
      next: () => {
        this.airportsForm.reset();
          this.router.navigateByUrl("/admin").then(r => console.log(r));
      },
      error: err => console.log(err)
    });
  }

  selectFile(event: any): void {
    this.fileList = event.target.files;
  }

  onBulkCreateFlightsSubmit(){
    if (this.fileList){
      const item: File | null = this.fileList.item(0);
      if (item){
        const formData: FormData = new FormData();
        formData.append("file", item);
        this.flightService.bulkCreateFlights(formData).subscribe({
          next: () => {
            this.router.navigateByUrl("/admin").then(r => console.log(r));
            this.snackbar.openFromComponent(AlertComponent, {
              data: 'Flights with CSV upload method created successfully.',
              duration: 2000
            })
          },
          error: err => this.snackbar.openFromComponent(AlertComponent, {
            data: err.error().message(),
            duration:2000
          })
        });
      }
    }
  }

  onBulkCreateAirportsSubmit(){
    if (this.fileList){
      const item: File | null = this.fileList.item(0);
      if (item){
        const formData: FormData = new FormData();
        formData.append("file", item);
        this.airportService.bulkCreateAirports(formData).subscribe({
          next: () => {
            this.router.navigateByUrl("/admin").then(r => console.log(r));
            this.snackbar.openFromComponent(AlertComponent, {
              data: 'Airports with CSV upload method created successfully.',
              duration: 2000
            })
          },
          error: err => this.snackbar.openFromComponent(AlertComponent, {
            data: err.error().message(),
            duration:2000
          })
        });
      }
    }
  }

  private getAirports() {
    this.airportService.getAirports().subscribe(data => {
      this.airports = data
    });
  }

  private getFlights(){
    this.flightService.getFlights().subscribe(data => {
      this.flights = data
    });
  }

  deleteAirport(id: number) {
    this.airportService.deleteAirport(id).subscribe({
      next: () => this.airports.slice(id, 1),
      error: err => console.log(err)
    });
  }

  deleteFlight(id: number) {
    this.flightService.deleteFlight(id).subscribe({
      next: () => this.flights.slice(id, 1),
      error: err => console.log(err)
    });
  }
}
