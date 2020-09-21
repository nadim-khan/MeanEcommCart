import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeStructureComponent } from './fee-structure/fee-structure.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', pathMatch: 'full', component: HomeComponent},
  {path: 'feeStructure', pathMatch: 'full', component: FeeStructureComponent},
  {path: 'products', pathMatch: 'full', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
