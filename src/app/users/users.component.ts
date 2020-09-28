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
  constructor(
    private userService: UsersService
  ) {
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
