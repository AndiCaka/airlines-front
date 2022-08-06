import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AdminComponent} from "./components/admin/admin.component";
import {FlightUpdateComponent} from "./components/flight-update/flight-update.component";
import {AirportUpdateComponent} from "./components/airport-update/airport-update.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {BookingComponent} from "./components/booking/booking.component";
import {BookingFormComponent} from "./components/booking-form/booking-form.component";
import {PostCreateComponent} from "./components/post-create/post-create.component";
import {PostComponent} from "./components/post/post.component";
import {NewComponent} from "./components/new/new.component";
import {PrivacypolicyComponent} from "./components/privacypolicy/privacypolicy.component";

const routes: Routes = [
  { path: 'flights/:id', component: FlightUpdateComponent },
  { path: 'airports/:id', component: AirportUpdateComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: SignupComponent},
  { path: 'bookings', component: BookingComponent},
  { path: 'flights/:id/book', component: BookingFormComponent},
  { path: 'add-post', component: PostCreateComponent},
  { path: 'posts/:id', component: PostCreateComponent},
  { path: 'news', component: PostComponent},
  { path: 'news/:id', component: NewComponent},
  { path: 'privacy-policy', component: PrivacypolicyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
