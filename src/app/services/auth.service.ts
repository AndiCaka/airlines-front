import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../common/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;

  userLoggedIn: Subject<User> = new BehaviorSubject<User>(
    this.loadUserFromLocalStorage()
  );

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    return this.http.post(`http://localhost:8080/api/auth/login`, {username: username, password: password}, {observe: 'response'});
  }

  register(user: User): Observable<any>{
    return this.http.post(`http://localhost:8080/api/auth/signup`, user, {responseType: 'text', observe: 'response'});
  }

  logout(): Observable<any>{
    return this.http.get(`http://localhost:8080/api/auth/logout`, {responseType: 'text'});
  }

  saveToken(token: string): void{
    this.token = token;
    localStorage.setItem('token', token);
  }

  saveUserToLocalStorage(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken(): string {
    return this.token;
  }
}
