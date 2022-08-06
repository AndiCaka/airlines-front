import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import { HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { AdminComponent } from './components/admin/admin.component';
import { FlightUpdateComponent } from './components/flight-update/flight-update.component';
import { AirportUpdateComponent } from './components/airport-update/airport-update.component';
import { LoginComponent } from './components/login/login.component';
import {AlertComponent} from './components/alert/alert.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import { SignupComponent } from './components/signup/signup.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostComponent } from './components/post/post.component';
import { NewComponent } from './components/new/new.component';
import { authInterceptorProviders } from "./utils/auth.interceptor";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import { FooterComponent } from './components/footer/footer.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminComponent,
    FlightUpdateComponent,
    AirportUpdateComponent,
    LoginComponent,
    AlertComponent,
    SignupComponent,
    BookingComponent,
    BookingFormComponent,
    PostCreateComponent,
    PostComponent,
    NewComponent,
    FooterComponent,
    PrivacypolicyComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatStepperModule,
        MatCardModule,
        MatGridListModule,
        MatExpansionModule,
        MatRadioModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatListModule
    ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    MatSnackBar,
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
