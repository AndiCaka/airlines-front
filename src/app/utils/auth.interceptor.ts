import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth.service";
import {AlertComponent} from "../components/alert/alert.component";
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private router: Router, private snackbar: MatSnackBar, private authService: AuthService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      let req = request;
      const token = localStorage.getItem('token');
    if (token != null) {
      req = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
    }
      return next.handle(req).pipe(tap({
        next: () => {},
        error: err => {
          if (err instanceof HttpErrorResponse){
            if (err.status !== 401) {
              return;
            }
            this.authService.logout();
            this.router.navigate(['login']).then(r => console.log(r));
            this.snackbar.openFromComponent(AlertComponent, {
              data: 'Login to access this resource.',
              duration: 3000
            })
          }
        }
      }));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
