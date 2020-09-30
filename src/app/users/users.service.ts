import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
allUsersList: any = [];
currentUserData;
isAdminBS = new BehaviorSubject(false);
  constructor(
    public authService: AuthService,
    public authGuard: AuthGuard,
    public jwtHelper: JwtHelperService
  ) {
   this.authService.User.subscribe(data => {
     if (data) {
       this.currentUserData = data;
     } else {
      this.adminCheck(this.currentUserData.user);
     }
   });
  }

  checkUser() {
    this.authService.checkLoginStatus();
    const token = localStorage.getItem('currentUser');
    if (token) {
      this.currentUserData = this.jwtHelper.decodeToken(token);
      console.log('Usermodule data1 : ', this.currentUserData);
      this.adminCheck(this.currentUserData);
    } else {
      this.authService.User.subscribe(data => {
        if (data) {
          this.currentUserData = data.user;
          console.log('Usermodule data : ', data);
          this.adminCheck(this.currentUserData);
        } else {
          
          this.isAdminBS.next(false);
        }
      });
    }

  }

   adminCheck(data) {
    let isAdmin;
    if (data) {
      isAdmin = (data.roles[0] === 'admin') ? true : false;
    } else {
      isAdmin = false;
    }
    this.isAdminBS.next(isAdmin);
   }
}
