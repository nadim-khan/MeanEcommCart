import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductDataService } from './product-data.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [ProductDataService]
})
export class ProductsModule { }
