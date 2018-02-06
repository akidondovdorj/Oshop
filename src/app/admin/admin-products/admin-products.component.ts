import { Observable } from 'rxjs/Observable';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  items: Product[];

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges()
         .subscribe(products => {
          this.filteredProducts = this.products = products;
         });
    this.productService.getAll().snapshotChanges()
      .subscribe(products => this.products = products);
         // this.subscription = this.productService.getAll().valueChanges()
  }

  filter (query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
