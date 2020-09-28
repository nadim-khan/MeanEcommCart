import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {
    path: '',  component: UsersComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'allUsers' },
      { path: 'allUsers',  component: AllUsersComponent },
      { path: 'addUser',  component: AddUserComponent },
      { path: 'addPayment', component: AddPaymentComponent },
      { path: '**', component: AddPaymentComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
