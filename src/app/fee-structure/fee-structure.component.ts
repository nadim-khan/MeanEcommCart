import { isDataSource } from '@angular/cdk/collections';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Fees } from '../services/fees';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.scss']
})
export class FeeStructureComponent implements OnInit, DoCheck {
  fieldArray: Fees[] = [];
  disableAdd = true;
  showSpinner = true;
  newAttribute: any = {description: '', fee: null};

  constructor(
    private general: GeneralService
  ) { }

  ngDoCheck() {
    this.checkField();
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

  addFeeDetail() {
    this.showSpinner = true;
    const details = {description: this.newAttribute.description, amount: this.newAttribute.fee};
    this.general.postNewFeeDetails(details).subscribe(resp => {
      if (resp) {
        this.getFeeStructure();
        this.newAttribute = {description: '', fee: null};
      }
    });
  }

  deleteFieldValue(id) {
    this.showSpinner = true;
    const feeId = id;
    this.general.feeDelete({_id: feeId}).subscribe(response => {
      console.log('Delete Response : ', response);
      this.getFeeStructure();
    });
  }

  checkField() {
    this.newAttribute.description = this.newAttribute.description.trim();
    if (this.newAttribute.description === '' || this.newAttribute.fee < 1) {
      this.disableAdd = true;
    } else {
      this.disableAdd = false;
    }
  }

}
