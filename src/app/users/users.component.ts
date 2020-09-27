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
  usersList: any = [];
  constructor(
    private userService: UsersService
  ) {
    this.userService.authService.getAllUsersList().subscribe(listData => {
      this.userService.allUsersList = listData;
      this.usersList = listData;
    });
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
