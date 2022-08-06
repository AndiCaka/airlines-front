import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private httpClient: HttpClient, private authService: AuthService, private snackbar: MatSnackBar, private router: Router ) { }

  ngOnInit(): void {}

  login(){
    this.authService.login(this.username, this.password).subscribe((response) => {
      this.authService.saveToken(response.headers.get('token'));
      //let user: User = JSON.parse(window.atob(response.headers.get('token').split('.')[1]));
      this.authService.saveUserToLocalStorage(response.body);
      this.authService.userLoggedIn.next(response.body);
      this.snackbar.openFromComponent(AlertComponent, {
        duration: 2000,
        data: "Login successful."
      });
      this.router.navigate(['/home']).then(() => window.location.reload());
    });
  }
}
