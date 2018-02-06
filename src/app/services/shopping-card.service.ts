import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCardService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cardId = localStorage.getItem('cardId');
    if (cardId) return cardId;

    let result = await this.create();
    localStorage.setItem('cardId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.title);
    item$.snapshotChanges().take(1).subscribe(item => {
      let qty = 0;
      if (item.payload.val()) qty = item.payload.val().quantity;
      item$.update({ product: product, quantity: qty + 1});
    });
  }

}
