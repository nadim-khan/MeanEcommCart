import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule } from '@angular/forms';
import { TrainersComponent } from './trainers.component';
import { TrainersRoutingModule } from './trainers-routing.module';


@NgModule({
  declarations: [TrainersComponent],
  imports: [
    CommonModule,
    TrainersRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ]
})
export class TrainersModule { }
