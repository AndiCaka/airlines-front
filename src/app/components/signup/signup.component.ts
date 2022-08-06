import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpResponse} from "@angular/common/http";
import {AlertComponent} from "../alert/alert.component";
import {User} from "../../common/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;
  email: string;

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {}

  register(){
    let user: User = new User();
    user.username = this.username;
    user.email = this.email;
    user.password = this.password;
    this.authService.register(user).subscribe((res:HttpResponse<any>) =>{
      this.snackbar.openFromComponent(AlertComponent, {
        data: res,
        duration: 2000
      });
      this.router.navigateByUrl('/login').then(r => console.log(r));
    });
  }

}
