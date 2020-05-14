import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { User } from './user.model';

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
  logout() {
    // remove user from Subject
    this.setUser(null);
    console.log('User has been logged out');
  }
  register() {
    // make api call to stor user in db
    // update the user Subject
    this.user$.next(this.regUser);
    console.log('authService register Data', this.regUser);
    return of(this.regUser);
  }
  getUser() {
    return this.user$.asObservable();
  }
  setUser(user) {
    this.user$.next(user);
  }
}
