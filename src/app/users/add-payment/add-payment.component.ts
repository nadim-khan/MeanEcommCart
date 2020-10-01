import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GeneralService } from 'src/app/services/general.service';
import { UsersService } from '../users.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit, OnDestroy {
  currentUser;
  showForm = false;
  details = [];
  originalDetails = [];
  filterVal;
  displayUser;
  monthData;
  yearData;
  thisYear = moment().year();
  selectedYear = this.thisYear;
  selectedMonths = [];
  selected = 1;
  constructor(
    private userService: UsersService,
    private general: GeneralService
  ) {
    this.userService.checkUser();
    this.userService.isAdminBS.subscribe(value => {
      this.currentUser = this.userService.currentUserData;
      if (this.currentUser) {
        this.getDetails();
      }
    });
  }

  ngOnInit() {
    this.monthData = Array.from({ length: 12 }, (e, i) => {
      return new Date(null, i + 1, null).toLocaleDateString('en', { month: 'short' });
    });
    this.yearData = [this.thisYear - 1, this.thisYear, this.thisYear + 1];
  }

  ngOnDestroy() {
    this.currentUser = null;
    this.originalDetails = [];
    this.details = [];
  }

  getDetails() {
    this.userService.authService.getAllUsersList().subscribe(listData => {
      this.userService.allUsersList = listData;
      this.details = this.userService.allUsersList;
      this.originalDetails = this.userService.allUsersList;
    });
  }

  selectedUser(data) {
    this.showForm = true;
    this.details = this.originalDetails;
    this.filterVal = '';
    console.log('Add payment : ', data);
    this.displayUser = this.details.filter(user => data.value === user.email);
  }

  onKey(val) {
    this.details = this.originalDetails;
    console.log('filter : ', val, this.details, this.originalDetails);
    this.details = this.details.filter(user =>
      user.username.toLowerCase().includes(val.toLowerCase()) || user.username.toLowerCase().includes(val.toLowerCase()));
  }

  clearFilter() {
    this.filterVal = '';
    this.details = this.originalDetails;
  }

  onChange(event) {
    this.selectedYear = event;
    console.log(event);
  }

  selectedMonthsData(data) {
    this.selectedMonths = [];
    this.selectedMonths = data.value;
  }

  updatePayment() {
    const payload = {
      email: this.displayUser.email,
      amount: 500,
      description: 'NA',
      year: this.selectedYear,
      month: this.selectedMonths,
      updatedBy: 'khan.nadim@gmail.com'
    };
    console.log('payload', payload);
    this.general.updatePayment(payload).subscribe(response => {
      console.log('Response for payment update', response);
    });
  }

}
