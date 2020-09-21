import { Component, ViewChild, HostListener, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from './auth/user';
import { AuthService } from './auth/auth.service';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  [x: string]: any;
  opened = true;
  isDark = false;
  userValues: User;
  userExist = false;
  username;
  email;
  error;
  hide = true;
  mode = 'dark';
  userSubscription: Subscription;
  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }
  @HostBinding('class')
  get theme() {
    return this.mode;
  }
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private general: GeneralService
  ) {
    this.getUserDetails();
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getUserDetails() {
    this.authService.User.subscribe(userData => {
      this.userValues = userData;
      if (this.userValues && this.userValues.user) {
        this.username = this.userValues.user.username;
        this.email = this.userValues.user.email;
        if (this.username && this.email && this.username !== '' && this.email !== '') {
          this.userExist = true;
        } else {
          this.userExist = false;
        }
      } else {
        this.userExist = false;
      }
    });
  }

  onLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action && result.action === 'login') {
        console.log('Login result : ', result);
        this.authService.login(result.email, result.password).subscribe(res => {
          if (res) {
            this.snackBar.open('Succesfully logged in.', 'Close', {
              duration: 4000,
            });
            this.router.navigateByUrl('/');
            this.getUserDetails();
          }
        }, e => {
          this.error = e;
          this.snackBar.open('Oops! Something went wrong. Please try again.', 'Close', {
            duration: 4000,
          });
        });
      } else if (result.action && result.action === 'register') {
        this.onRegister();
      }
    });
  }

  onRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '650px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action && result.action === 'register') {
        this.authService.register(result.data).subscribe(res => {
          if (res) {
            this.snackBar.open('User has been registered succesfully.', 'Close', {
              duration: 2000,
            });
            this.getUserDetails();
          }
          this.router.navigate(['']);
        });
      } else if (result.action && result.action === 'invalid') {
        this.snackBar.open('Invalid values! please re-register', 'Close', {
          duration: 2000,
        });
      } else if (result.action && result.action === 'login') {
        this.onLogin();
      }
    });
  }

  onModeSwitch(isDarkMode) {
    this.isDark = !this.isDark;
  }

  themeOptions(option) {
    console.log(option.value);
    switch (option.value) {
      case 'dark':
        this.mode = 'dark';
        break;
      case 'blue':
        this.mode = 'blue';
        break;
      case 'green':
        this.mode = 'green';
        break;
      case 'orange':
        this.mode = 'orange';
        break;
      default:
        this.mode = 'dark';
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authService.logout();
    this.getUserDetails();
    this.snackBar.open('Logged out successfully.', 'Close', {
      duration: 4000,
    });
    this.router.navigate(['']);
  }

  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }
}

@Component({
  selector: 'app-dialog-login',
  templateUrl: 'login.html',
})
export class LoginDialogComponent {
  hide = true;
  email: string | null = null;
  password: string | null = null;
  error: string;
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router,
    private authService: AuthService
  ) { }

  login(): void {
    this.error = '';
    this.dialogRef.close({ action: 'login', email: this.email, password: this.password });
  }

  register() {
    this.dialogRef.close({ action: 'register' });
  }

  onNoClick(): void {
    this.dialogRef.close({ action: 'close' });
  }

}

@Component({
  selector: 'app-dialog-register',
  templateUrl: 'register.html',
})
export class RegisterDialogComponent {
  hide = true;
  rehide = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>
  ) { }

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
    //    if ((control.value).indexOf(' ') >= 0) {
    //      return {
    //        cannotContainSpace: true
    //       };
    //  }
    return null;
  }

  passwordMatch(control: FormControl) {
    const password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  register() {
    if (!this.registrationData.valid) {
      this.dialogRef.close({ action: 'invalid' });
      return;
    }
    const regCreds = this.registrationData.getRawValue();
    // console.log('registrationData data', this.registrationData.value);
    this.authService.regUser = regCreds;
    this.dialogRef.close({ action: 'register', data: regCreds });

    this.registrationData.reset();
  }

  login() {
    this.dialogRef.close({ action: 'login' });
  }

  clearForm() {
    this.registrationData.reset();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
