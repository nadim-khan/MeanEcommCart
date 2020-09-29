import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface UserData {
  _id: string;
  index: number;
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
  displayedColumns: string[] = ['id', 'username', 'email', 'action'];
  dataSource: MatTableDataSource<UserData>;
  isAdmin = false;
  expandedElement: UserData | null;
  filterValue;
  currentId;
  showButton = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public userService: UsersService
  ) {
    // check if user is admin - Behaviour subject
    this.userService.isAdminBS.subscribe(value => {
      this.isAdmin = value;
    });

    this.userService.authService.getAllUsersList().subscribe(listData => {
      this.userService.allUsersList = listData;
      const users = listData;
      console.log('users', users);
      for (let i = 0; i < users.length; i ++) {
        users[i] = Object.assign({}, users[i], {index : i + 1});
        console.log(' users4', users);
      }
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
    return '#56F70B ';
  } else if (user === 'executive') {
    return '#0BDBF7 ';
  } else if (user === 'general') {
    return '#F7DE0B ';
  } else {
    return '#FF0D0D';
  }
  }

  addNew() {

  }

  onExpand(value) {
    console.log('===>', value);
    if (value) {
      this.currentId = value._id;
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

}
