import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 hide = true;
 rehide = true;
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }
  registrationData = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), this.cannotContainSpace]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordMatch]),
  });

  get f() {
    return this.registrationData.controls;
  }

  cannotContainSpace(control: FormControl) {
    if ((control.value).indexOf(' ') >= 0) {
      return {
        cannotContainSpace: true
       };
  }
    return null;
  }

  passwordMatch(control: FormControl) {
    const password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch : true
    } : null;
  }

  register() {
    if (!this.registrationData.valid) {
      return;
    }
    const regCreds = this.registrationData.getRawValue();
  // console.log('registrationData data', this.registrationData.value);
    this.authService.regUser = regCreds;
    this.authService.register(regCreds).subscribe(s => {
    this.router.navigate(['']);
  });
    this.registrationData.reset();
  }

  clearForm() {
    this.registrationData.reset();
  }

  ngOnInit(): void {
  }

}
