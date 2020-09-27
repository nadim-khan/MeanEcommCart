import { Injectable } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
isAdmin = false;
allUsersList: any = [];
  constructor(
    public authService: AuthService,
    public authGuard: AuthGuard
  ) {
    this.isAdmin = authService.isAdmin;
  }
}
