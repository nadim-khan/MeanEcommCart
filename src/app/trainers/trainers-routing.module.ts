import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainersComponent } from './trainers.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: TrainersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainersRoutingModule { }
