import { Injectable } from '@angular/core';
import { Subject, of, throwError, Observable, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loginUser;
  regUser;
  token;
  userInfo;
  isAdmin = false;
  // URL definition (api- path, auth-feature(user,finace,etc..), register - action)
  private apiUrl = environment.authApi;
  private user$ = new Subject<User>();

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    this.checkLoginStatus();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    } else {
      return true;
    }
    // Check whether the token is expired and return
    // true or false
  }

  checkLoginStatus() {
    this.token = localStorage.getItem('currentUser');
    if (this.token) {
      const foundUser = { token: this.token, user: this.jwtHelper.decodeToken(this.token) };
      console.log('foundUser : ', foundUser);
      this.setUser(foundUser);
      this.checkForUserType(foundUser);
      return of(foundUser);
    } else {
      return of(null);
    }
  }

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    return this.http.post<User>(`${this.apiUrl}/login`, loginCredentials)
      .pipe(
        switchMap(foundUser => {
          this.setUser(foundUser);
          console.log('User Logged In  : ', foundUser);
          localStorage.setItem('currentUser', foundUser.token);
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
    localStorage.removeItem('currentUser');
    this.setUser(null);
    this.checkLoginStatus();
    console.log('User has been logged out');
  }

  register(user: any) {
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
  getAllUsersList() {
    return this.http.get(`${this.apiUrl}/getAllUsers`);
  }

  get User() {
    this.user$.asObservable().subscribe(res => {
      const userData = res;
      if (userData) {
        this.checkForUserType(userData);
      } else {
        this.isAdmin = false;
      }
    });
    return this.user$.asObservable();
  }

  setUser(user) {
    this.user$.next(user);
  }

  checkForUserType(userData) {
    if (userData.user.roles && userData.user.roles.length > 0) {
      this.isAdmin = (userData.user.roles[0] === 'admin') ? true : false;
    } else {
      this.isAdmin = false;
    }
  }

}
