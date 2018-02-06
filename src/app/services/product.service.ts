import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  getAll() {
    return this.db.list('products');
  }

  get(id) {
    return this.db.object('/products/' + id);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
