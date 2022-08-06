import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Airport} from "../../common/airport";
import {ActivatedRoute, Router} from "@angular/router";
import {AirportService} from "../../services/airport.service";

@Component({
  selector: 'app-airport-update',
  templateUrl: './airport-update.component.html',
  styleUrls: ['./airport-update.component.css']
})
export class AirportUpdateComponent implements OnInit {

  airportForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute, private airportService: AirportService, private router: Router) { }

  id: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.airportService.getAirportById(this.id).subscribe(item => {
      this.airportForm = this.formBuilder.group({
        name: new FormControl(item.name),
        airportCode: new FormControl(item.airportCode),
        city: new FormControl(item.city),
        flagUrl: new FormControl(item.flagUrl),
      });
    });
  }

  onAirportSubmit(){
    let airport: Airport = this.airportForm.value;
    airport.id = this.id;
    this.airportService.updateAirport(airport).subscribe({
      next: () => this.router.navigateByUrl("/admin"),
      error: err => console.log(err)
    });
  }

}
