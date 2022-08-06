import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Airport} from "../../common/airport";
import {Flight} from "../../common/flight";
import {FlightService} from "../../services/flight.service";
import {AirportService} from "../../services/airport.service";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  airports: Airport[] = [];
  flights: Flight[] = [];
  searchForm: FormGroup;

  isBiDirectional: boolean = false;
  panelOpenState: boolean = false;

  departureOptions: Observable<Airport[]>;
  arrivalOptions: Observable<Airport[]>;


  constructor(private flightService: FlightService, private airportService: AirportService,  private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getAirports();
    this.searchForm = this.formBuilder.group({
      departureAirportCtrl: new FormControl(''),
      arrivalAirportCtrl: new FormControl(''),
      departureDate: new FormControl(''),
      returnDate: new FormControl(''),
      flightClass: new FormControl(''),
    });

    this.departureOptions = this.searchForm.get('departureAirportCtrl').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.arrivalOptions = this.searchForm.get('arrivalAirportCtrl').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getAirports(){
    return this.airportService.getAirports().subscribe(data => {
      this.airports = data
    });
  }

  private _filter(value:  string): Airport[] {
    return this.airports.filter(option => option.name.toLowerCase().includes(value));
  }

  onSubmit(){
    let departureAirportId: number = this.searchForm.get('departureAirportCtrl').value;
    let arrivalAirportId: number = this.searchForm.get('departureAirportCtrl').value +1;
    let departureDate:Date = this.searchForm.get('departureDate').value;
    let returnDate:Date = this.searchForm.get('returnDate').value;
    let goodDate: string = `${departureDate.getFullYear()}-${departureDate.getMonth()+1}-${departureDate.getDate()}`;
    let goodDateReturn: string = this.isBiDirectional ? `${returnDate.getFullYear()}-${returnDate.getMonth()+1}-${returnDate.getDate()}`: '';
    this.flightService.getFlightsFiltered(JSON.stringify(departureAirportId), JSON.stringify(arrivalAirportId), goodDate,
      this.isBiDirectional ? goodDateReturn : '', this.isBiDirectional).subscribe(
      data => {
        this.flights = data;
      });
  }

  checkBiDirectional(event: MatCheckboxChange){
    this.isBiDirectional = event.checked;
  }
}
