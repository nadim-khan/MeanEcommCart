import { Component, ViewChild, HostListener, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  [x: string]: any;
  opened = true;
  user: User;
  userSubscription: Subscription;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.User.subscribe(userData => {
      this.user = userData;
      console.log('Profile', this.user);
    });
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  ngOnInit() {
    if (window.innerWidth < 768) {
     // this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
     // this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      // this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      // this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
