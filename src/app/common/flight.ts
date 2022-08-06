import {Airport} from "./airport";

export class Flight {
  id: number;
  capacity: number;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureDate: Date;
  returnDate?: Date;
  flightClass: string;
  flightPrice: number;
}
