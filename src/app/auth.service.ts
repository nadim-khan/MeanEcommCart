import { Injectable } from '@angular/core';
import { Subject, of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loginUser;
  regUser;
  // URL definition (api- path, auth-feature(user,finace,etc..), register - action)
  private apiUrl = '/api/auth';
  private user$ = new Subject<User>();

  constructor( private http: HttpClient) { }

  login(email: string, password: string) {
    const loginCredentials = {email, password };
    return this.http.post<User>(`${this.apiUrl}/login`, loginCredentials)
    .pipe(
      switchMap(foundUser => {
        this.setUser(foundUser);
        console.log('User Logged In  : ', foundUser);
        return of(foundUser);
      }),
      catchError(e => {
        console.log('Server error occured : ', e);
        return throwError('Login error occured , Please try again !');
      })
    );
  }

  logout() {
    // remove user from Subject
    this.setUser(null);
    console.log('User has been logged out');
  }

  register(user: any) {
    // // make api call to stor user in db
    // // update the user Subject
    // this.setUser(user);
    // console.log('authService register Data', user);
    // return of(user);
    return this.http.post(`${this.apiUrl}/register`, user)
    .pipe(
      switchMap(savedUser => {
        this.setUser(savedUser);
        console.log('User Registered successfully : ', user);
        return of(savedUser);
      }),
      catchError(e => {
        console.log('Server error occured : ', e);
        return throwError('Registration error occured , Please contact admin !');
      })
      );
  }

  get User() {
    return this.user$.asObservable();
  }

  setUser(user) {
    this.user$.next(user);
  }

}
