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
import * as moment from 'moment';
import { Broadcast } from './services/Broadcast';

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
  isAdmin = false;
  hide = true;
  mode = 'dark';
  username;
  email;
  error;
  role;
  broadcatMsgData;
  allBroadcastMsgs: Broadcast[] = [];
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
   this.refreshAll();
  }

  refreshAll() {
    this.getUserDetails();
    this.getBroadcastMsg();
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

  getBroadcastMsg() {
    this.general.getAllBroadcast().subscribe(msgs => {
      this.allBroadcastMsgs = (msgs as unknown as Broadcast[]);
      if (this.allBroadcastMsgs && this.allBroadcastMsgs.length > 0) {
        this.broadcatMsgData = this.allBroadcastMsgs[this.allBroadcastMsgs.length - 1];
      }
    });
  }

  getUserDetails() {
    this.authService.checkLoginStatus().subscribe(userData => {
      this.userValues = userData;
      if (this.userValues === null) {
        this.authService.User.subscribe(user => {
          this.userValues = user;
          this.checkUserDetails();
        });
      } else {
        this.checkUserDetails();
      }
    });
  }

  // Set user properties to display
  checkUserDetails() {
    if (this.userValues && this.userValues.user) {
      this.username = this.userValues.user.username;
      this.email = this.userValues.user.email;
      if (this.userValues.user.roles.length > 0 ) {
        this.role = this.userValues.user.roles[0];
        if ( this.role === 'admin') {
        this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isAdmin = false;
      }
      if (this.username && this.email && this.username !== '' && this.email !== '') {
        this.userExist = true;
      } else {
        this.userExist = false;
      }
    } else {
      this.userExist = false;
      this.isAdmin = false;
    }
  }

  // Login to Users account
  onLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action && result.action === 'login') {
        console.log('Login result : ', result);
        this.authService.login(result.email, result.password).subscribe(res => {
          if (res) {
            this.snackBar.open('Succesfully logged in.', 'Close', {
              duration: 4000,
            });
            this.router.navigateByUrl('/');
            this.refreshAll();
          }
        }, e => {
          this.error = e;
          this.snackBar.open('Oops! Something went wrong. Please try again.', 'Close', {
            duration: 4000,
          });
        });
      } else if (result && result.action && result.action === 'register') {
        this.onRegister();
      }
    });
  }

  // Register new User
  onRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action && result.action === 'register') {
        this.authService.register(result.data).subscribe(res => {
          if (res) {
            this.snackBar.open('User has been registered succesfully.', 'Close', {
              duration: 2000,
            });
            this.refreshAll();
          }
          this.router.navigate(['']);
        });
      } else if (result &&  result.action && result.action === 'invalid') {
        this.snackBar.open('Invalid values! please re-register', 'Close', {
          duration: 2000,
        });
      } else if (result && result.action && result.action === 'login') {
        this.onLogin();
      }
    });
  }

  // Switch mode
  onModeSwitch(isDarkMode) {
    this.isDark = !this.isDark;
  }

  // Choose theme
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

  getAlertClass(type) {
    if (type === 'general') {
      return 'bg-green';
    } else if (type === 'warning') {
      return 'bg-yellow';
    } else if (type === 'danger') {
      return 'bg-red';
    }
  }

  // Broadcast a message
  broadcast() {
    const dialogRef = this.dialog.open(BroadcastDialogComponent, { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
      if (result.action && result.action === 'broadcast') {
        const formattedData = {
          message: result.data.message,
          type: result.data.type,
          fromDate: moment(new Date(result.data.fromDate)).format('YYYY-MM-DD[T00:00:00.000Z]'),
          toDate: moment(new Date(result.data.toDate)).format('YYYY-MM-DD[T00:00:00.000Z]')
        };
        this.general.newBroadcast(formattedData).subscribe(response => {
          if (response) {
            this.snackBar.open('Message will be displayed to everyone.', 'Close', {
              duration: 2000,
            });
            this.refreshAll();
          }
        });
      }
    });
  }

  // Show notification
  showNotification() {

  }

// Check screen width and size
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

  // logout user
  logout() {
    this.authService.logout();
    this.refreshAll();
    this.snackBar.open('Logged out successfully.', 'Close', {
      duration: 4000,
    });
    this.router.navigate(['']);
  }

  // theme check
  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }
}

// Login form inside popup
@Component({
  selector: 'app-dialog-login',
  templateUrl: './popups/login.html',
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

// Login form inside popup
@Component({
  selector: 'app-dialog-register',
  templateUrl: './popups/register.html',
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
    this.dialogRef.close({ action: 'close' });
  }


}

// BroadcastDialogComponent

@Component({
  selector: 'app-dialog-broadcast',
  templateUrl: './popups/broadcast.html',
})
export class BroadcastDialogComponent {
  hide = true;
  rehide = true;
  type = [
    {id: 1, name: 'General', value: 'general'},
    {id: 2, name: 'Warning', value: 'warning'},
    {id: 3, name: 'Danger', value: 'danger'}
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<BroadcastDialogComponent>
  ) { }

  broadcastData = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(3)]),
    type: new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.broadcastData.controls;
  }

  broadcastNow() {
    if (!this.broadcastData.valid) {
      this.dialogRef.close({ action: 'invalid' });
      return;
    }
    const broadcast = this.broadcastData.getRawValue();
    this.dialogRef.close({ action: 'broadcast', data: broadcast });
  }

  clearForm() {
    this.broadcastData.reset();
    this.dialogRef.close({ action: 'close' });
  }

}
