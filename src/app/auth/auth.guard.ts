import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,  } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  canActivate() {
    return true;
  }
  canActivateChild() {
    return true;
  }
}
