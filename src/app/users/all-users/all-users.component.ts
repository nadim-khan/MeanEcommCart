import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface UserData {
  _id: string;
  username: string;
  email: string;
  colcreatedAt: string;
  hashedPassword: string;
  roles: any;
}



@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AllUsersComponent {
  displayedColumns: string[] = ['username', 'email', 'userType', 'registrationDate', 'action'];
  dataSource: MatTableDataSource<UserData>;
  isAdmin = false;
  expandedElement: UserData | null;
  filterValue;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public userService: UsersService
  ) {
    this.isAdmin = this.userService.isAdmin;
    this.userService.authService.getAllUsersList().subscribe(listData => {
      this.userService.allUsersList = listData;
      const users = listData;
      console.log('users', users);
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
      console.log(' this.dataSource', this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.filterValue = '';
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  changeUserColor(user) {
  if (user === 'admin') {
    return '#5BFF33 ';
  } else if (user === 'executive') {
    return '#FF5733';
  } else if (user === 'general') {
    return '#33C1FF';
  }
  }

  addNew() {

  }

}
