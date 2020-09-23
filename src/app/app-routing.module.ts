import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'home', pathMatch: 'full', component: HomeComponent},
  {path: 'products', pathMatch: 'full', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  {path: 'users', pathMatch: 'full', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  {path: 'trainers', pathMatch: 'full', loadChildren: () => import('./trainers/trainers.module').then(m => m.TrainersModule)},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
