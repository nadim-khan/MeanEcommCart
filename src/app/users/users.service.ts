import { Injectable } from '@angular/core';
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
    public authGuard: AuthGuard
  ) {
    let isAdmin;
    this.authService.checkLoginStatus();
    this.authService.User.subscribe(data => {
      console.log('Usermodule data : ', data);
      if (data) {
        isAdmin = (data.user.roles[0] === 'admin') ? true : false;
      } else {
        isAdmin = false;
      }
      this.isAdminBS.next(isAdmin);
    });
  }
}
