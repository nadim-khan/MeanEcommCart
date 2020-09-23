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
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.User.subscribe(userData => {
      this.userInfo = userData.user;
    });
  }

  change(event) {

  }

}


