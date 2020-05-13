import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  productsUrl = 'products.json';

  constructor(private http: HttpClient) { }
  getAllProducts() {
    return  this.http.get(this.productsUrl);
  }
}
