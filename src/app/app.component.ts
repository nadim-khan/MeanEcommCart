import { Component, ViewChild, HostListener, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {OverlayContainer} from '@angular/cdk/overlay';

import { User } from './auth/user';
import { AuthService } from './auth/auth.service';
import { GeneralService } from './services/general.service';
import * as moment from 'moment';
import { Broadcast } from './services/broadcast';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { catchError, last, map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

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
  browserLang;
  languageSet = [];
  broadcastMsgData;
  allBroadcastMsgs: Broadcast[] = [];
  userSubscription: Subscription;
  notification = [
    {
      icon: '/cms/assets/imgs/bids.svg',
      title: 'New Bid',
      content: 'Fuller Warren Buliding AHU thing',
      createdOn: '2020-12-01T06:43:00.000Z',
      checked: 'false'
    },
    {
      icon: '/cms/assets/imgs/certifications.svg',
      title: 'CBE Certification Rejected',
      content: 'CBE Certification has been rejected',
      createdOn: '2020-11-27T07:43:00.000Z',
      checked: 'false'
    },
    {
      icon: '/cms/assets/imgs/report.svg',
      title: 'Missing Report',
      content: 'A report is found missing',
      createdOn: '2020-12-01T08:45:00.000Z',
      checked: 'false'
    },
    {
      icon: '/cms/assets/imgs/payment.svg',
      title: 'Overdue Payment',
      content: 'You payment is overdue.Please take',
      createdOn: '2020-11-30T15:43:00.000Z',
      checked: 'false'
    },
    {
      icon: '/cms/assets/imgs/w9.svg',
      title: 'Invalid W9',
      content: 'Form W9 is invalid',
      createdOn: '2020-11-30T02:43:00.000Z',
      checked: 'false'
    },
    {
      icon: '/cms/assets/imgs/certifications.svg',
      title: 'CBE Certification Rejected',
      content:
        'CBE Certification has been rejected and will be sent you an email',
      createdOn: '2020-11-30T07:43:00.000Z',
      checked: 'false'
    },
    {
      icon: '/cms/assets/imgs/report.svg',
      title: 'Missing Report',
      content: 'A report is found missing will get back to you within 24 hours',
      createdOn: '2020-11-29T08:45:00.000Z',
      checked: 'false'
    }
  ];

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
    private general: GeneralService,
    public overlayContainer: OverlayContainer,
    public translate: TranslateService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.refreshAll();
    translate.addLangs(['en', 'hi', 'ar']);
    translate.setDefaultLang('en');
    this.browserLang = translate.getBrowserLang();
    translate.use(this.browserLang.match(/en|hi/) ? this.browserLang : 'en');
    this.generateLanguageSet();
  }

  selectAll($event: any) {
    console.log($event);
    this.notification = this.notification.map(val => {
      if (val.checked === 'true') {
        val.checked = 'false';
      } else {
        val.checked = 'true';
      }
      return val;
    });
  }



  refreshAll() {
    this.getUserDetails();
    this.getBroadcastMsg();
  }

  generateLanguageSet() {
    const langs = this.translate.getLangs();
    const set = [
      {code: 'en', name: 'English', nativeName: 'English'},
      {code: 'hi', name: 'Hindi', nativeName: 'हिन्दी'},
      {code: 'ar', name: 'Arabic', nativeName: 'العربية'},
    ];
    set.forEach(data => {
      if (langs.includes(data.code)) {
        this.languageSet.push(data);
      }
    });
    const localStorageLang = localStorage.getItem('selectedLanguage');
    console.log('this.languageSet', this.languageSet);
    if (localStorageLang) {
      this.translate.use(localStorageLang);
      this.dateAdapter.setLocale( localStorageLang);
      this.browserLang = localStorageLang;
    }
  }

  setLanguage(value) {
    localStorage.setItem('selectedLanguage', value);
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
    this.notification = this.notification.map(val => {
      const x = Object.assign({}, val, { checked: false });
      return x;
    });
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
        this.authService.broadcastAvailable.next(true);
        this.broadcastMsgData = this.allBroadcastMsgs[this.allBroadcastMsgs.length - 1];
      } else {
        this.authService.broadcastAvailable.next(false);
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
      if (this.userValues.user.roles.length > 0) {
        this.role = this.userValues.user.roles[0];
        if (this.role === 'admin') {
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
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            // this.router.navigateByUrl('/');
            this.refreshAll();
          }
        }, e => {
          this.error = e;
          this.snackBar.open('Oops! Something went wrong. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
              verticalPosition: 'top',
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
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.refreshAll();
          }
          // this.router.navigate(['']);
        });
      } else if (result && result.action && result.action === 'invalid') {
        this.snackBar.open('Invalid values! please re-register', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
              verticalPosition: 'top',
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
    this.overlayContainer.getContainerElement().classList.value = 'cdk-overlay-container';
    this.overlayContainer.getContainerElement().classList.add(option.value);
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
      if (result && result.action && result.action === 'broadcast') {
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
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.refreshAll();
          }
        });
      }
    });
  }

  // Show notification
  showNotification(id) {
    const dialogRef = this.dialog.open(ShowNotificationComponent, { panelClass: 'custom-dialog-container' });
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
      horizontalPosition: 'center',
              verticalPosition: 'top',
    });
    this.userExist = false;
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
  ) {
    this.dialogRef.disableClose = true;
  }

  loginData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  get f() {
    return this.loginData.controls;
  }

  login(): void {
    if (!this.loginData.valid) {
      this.dialogRef.close({ action: 'invalid' });
      return;
    }
    const loginCreds = this.loginData.getRawValue();
    this.dialogRef.close({ action: 'login', email: loginCreds.email, password: loginCreds.password });
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
  files = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private http: HttpClient
  ) {
    this.dialogRef.disableClose = true;
  }

  registrationData = new FormGroup({
    profilePic: new FormControl(''),
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

  onUploadClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });
      }
    };
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
  minDate = new Date();
  type = [
    { id: 1, name: 'General', value: 'general' },
    { id: 2, name: 'Warning', value: 'warning' },
    { id: 3, name: 'Danger', value: 'danger' }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<BroadcastDialogComponent>
  ) {
    this.dialogRef.disableClose = true;
   }

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


// BroadcastDialogComponent

@Component({
  selector: 'app-dialog-notification',
  templateUrl: './popups/notificationt.html',
})
export class ShowNotificationComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<BroadcastDialogComponent>
  ) {
    this.dialogRef.disableClose = false;
   }

}

