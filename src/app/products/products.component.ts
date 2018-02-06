import { ShoppingCardService } from './../services/shopping-card.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  filteredProducts: any[] = [];
  products: any[];
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    shoppingCartService: ShoppingCardService) {
    productService
      .getAll()
      .valueChanges()
      .switchMap(products => {
        this.filteredProducts = this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : this.products;
      });
  }

}
