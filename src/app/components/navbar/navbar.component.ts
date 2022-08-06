import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../common/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertComponent} from "../alert/alert.component";
import {Router} from "@angular/router";
import {Role} from "../../common/role";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  admin: Role;
  isAdmin: boolean;

  constructor(private authService: AuthService, private snackbar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.loadUser();
    this.getAdmin();
    this.isAdmin = this.admin !== null;
  }

  loadUser() {
    this.authService.userLoggedIn.subscribe((response: User) => {
      this.user = response;
    });
  }


  logout() {
    this.authService.logout().subscribe((res) => {
      localStorage.clear();
      this.router.navigateByUrl('/login').then(() => window.location.reload());
      this.snackbar.openFromComponent(AlertComponent, {
        duration: 2000,
        data: res
      });
    });
  }

  getAdmin(){
   this.admin =  this.user.roles.find(obj => {
      return obj.name === 'ADMIN';
    });
  }
}
