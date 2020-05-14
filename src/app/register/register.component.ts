import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 hide = true;
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }
  registrationData = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    pass: ['', Validators.required]
  });
  register() {
  const regCreds = this.registrationData.getRawValue();
  // console.log('registrationData data', this.registrationData.value);
  this.authService.regUser = regCreds;
  this.authService.register().subscribe(s => {
    console.log('regi s =>', s);
    this.router.navigate(['login']);
  });
  }

  ngOnInit(): void {
  }

}
