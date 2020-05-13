import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 hide = true;
  constructor(private router: Router, private fb: FormBuilder) { }
  registrationData = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    pass: ['', Validators.required]
  });
  register() {
  console.log('registrationData data', this.registrationData.value);
  }

  ngOnInit(): void {
  }

}
