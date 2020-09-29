import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isExpanded = false;
  currentPage = '';
  userAvailable = false;
  hasBroadcast = false;
  constructor(
    private userService: UsersService
  ) {
    const userData = localStorage.getItem('currentUser');
    // check if broadcast msg is being shown - Behaviour subject
    this.userService.authService.broadcastAvailable.subscribe(value => {
      this.hasBroadcast = value;
    });
    if (userData) {
      this.userAvailable = true;
    } else {
      this.userAvailable = false;
    }
   }

  ngOnInit(): void {
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return false;
    } else {
      return true;
    }
  }

}
