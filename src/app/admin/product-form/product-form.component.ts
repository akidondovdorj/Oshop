import { Product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll().snapshotChanges();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== 'new') {
      this.productService.get(this.id).valueChanges().take(1)
      .subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (this.id) this.productService.delete(this.id);

    this.router.navigate(['/admin/products']);
  }

}
