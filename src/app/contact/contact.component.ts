import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnChanges {
  @Input() userInfo;
  currentUserName = '';
  currentUserEmail = '';

  constructor() { }

  queryData = new FormGroup({
    email: new FormControl(this.currentUserEmail, [Validators.required, Validators.email]),
    queryDetail: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });


  ngOnChanges() {
    if (this.userInfo) {
      this.currentUserName = this.userInfo.username;
      this.currentUserEmail = this.userInfo.email;
    }
  }

  ngOnInit(): void {
  }

  get f() {
    return this.queryData.controls;
  }

  sendQuery() {
    const queryToBeSent = this.queryData.getRawValue();
    console.log('queryToBeSent data', queryToBeSent);
    this.queryData.reset();
  }

  clearForm() {
    this.queryData.reset();
  }



}
