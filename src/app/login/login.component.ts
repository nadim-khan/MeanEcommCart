import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private router: Router, private fb: FormBuilder) { }
  loginData = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  login() {
  console.log('Login data', this.loginData.value);
  }

  ngOnInit(): void {
  }

}
