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
  email: string | null = null;
  password: string | null = null;
  error: string ;
  
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
  }
  login(): void {
    this.error = '';
    // tslint:disable-next-line: no-non-null-assertion
    this.authService.login(this.email!, this.password!).subscribe(() => {
      this.router.navigateByUrl('/');
    }, e => {
      this.error = e;
    });
  }
}
