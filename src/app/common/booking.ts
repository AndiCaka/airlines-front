import {Passenger} from "./passenger";
import {Flight} from "./flight";

export class Booking {
  id: number;
  uuid: string;
  passengers: Passenger[];
  flight: Flight;
  checkedIn: boolean;
  baggage: string;
}
