import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AllUsersComponent } from './all-users/all-users.component';



@NgModule({
  declarations: [
    UsersComponent,
    AddUserComponent,
    AddPaymentComponent,
    AllUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ]
})
export class UsersModule { }
