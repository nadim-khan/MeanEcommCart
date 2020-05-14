import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

export interface User {
  username: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUser;
  regUser;
  private user$ = new Subject<User>();
  constructor() { }
  login() {
    console.log('authService login data', this.loginUser);
    return of(this.loginUser);
  }
  register() {
    this.user$.next(this.regUser);
    console.log('authService register Data', this.regUser);
    return of(this.regUser);
  }
  getUser() {
    return this.user$.asObservable();
  }
}
