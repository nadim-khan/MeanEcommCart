import { isDataSource } from '@angular/cdk/collections';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ignoreElements } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { Fees } from '../services/fees';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.scss']
})
export class FeeStructureComponent implements OnInit, OnChanges {
  fieldArray: Fees[] = [];
  displayedColumns =
      ['index', 'subscription', 'description', 'amount', 'action'];
  disableAdd = true;
  showSpinner = true;
  isAdmin = false;
  @Input() userInfo;

  constructor(
    private general: GeneralService,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userInfo) {
      if (this.userInfo.roles.length > 0 && this.userInfo.roles[0] === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }


  ngOnInit() {
    this.getFeeStructure();
  }

  getFeeStructure() {
    this.general.getFeeStructure().subscribe(data => {
      this.fieldArray = (data as unknown as Fees[]);
      this.showSpinner = false;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(AddFeeDialogComponent, { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
      if (result.action && result.action === 'addFee') {
        this.general.postNewFeeDetails(result.data).subscribe(resp => {
          if (resp) {
            this.getFeeStructure();
          }
        });
      } else {
        return;
      }
    });
  }

  deleteFieldValue(id) {
    this.showSpinner = true;
    const feeId = id;
    this.general.feeDelete({ _id: feeId }).subscribe(response => {
      console.log('Delete Response : ', response);
      this.getFeeStructure();
    });
  }


}

// Add new fee detail inside popup
@Component({
  selector: 'app-dialog-login',
  templateUrl: '../popups/addFee.html',
})
export class AddFeeDialogComponent {
  hide = true;
  description: string | null = null;
  amount: number | null = null;
  error: string;
  constructor(
    public dialogRef: MatDialogRef<AddFeeDialogComponent>,
    private authService: AuthService
  ) { }

  feeData = new FormGroup({
    subscription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  get f() {
    return this.feeData.controls;
  }

  addFeeNow(): void {
    if (!this.feeData.valid) {
      this.dialogRef.close({ action: 'invalid' });
      return;
    }
    const feeDetails = this.feeData.getRawValue();
    // console.log('registrationData data', this.registrationData.value);
    this.authService.regUser = feeDetails;
    this.dialogRef.close({ action: 'addFee', data: feeDetails });

    this.feeData.reset();
  }


  onNoClick(): void {
    this.dialogRef.close({ action: 'close' });
    this.feeData.reset();
  }

}
