import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products;
  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {
     this.productDataService.getAllProducts().subscribe(data => {
      this.products = data;
    })
  }

}
