import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }
  loginData = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  login() {
  const logCreds = this.loginData.getRawValue();
  //console.log('Login data', logCreds);
  this.authService.loginUser = logCreds;
  this.authService.login().subscribe(s => {
    console.log('login s =>', s);
    this.router.navigate(['']);
  });
  }

  ngOnInit(): void {
  }

}
