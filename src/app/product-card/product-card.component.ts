import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCardService } from '../services/shopping-card.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCardService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    
    let item = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }
}
