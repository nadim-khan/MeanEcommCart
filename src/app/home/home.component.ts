import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data;
  show = false;
  userInfo;
  constructor(
    private router: Router,
    private authService: AuthService,
    private general: GeneralService
    ) {
      this.authService.User.subscribe(userData => {
        if (userData) {
          this.userInfo = userData.user;
        }
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.User.subscribe(userData => {
      if (userData !== null) {
        this.userInfo = userData.user;
      } else {
        this.userInfo = null;
      }
    });
  }

  change(event) {

  }

}


