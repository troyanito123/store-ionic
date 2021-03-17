import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image } from '../../interfaces/interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
})
export class ProductImagesComponent implements OnInit, OnDestroy {
  @Input() images: Image[];

  productSubs: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productSubs = this.productService.product$.subscribe(
      (product) => (this.images = product.images)
    );
  }

  ngOnDestroy() {
    this.productSubs?.unsubscribe();
  }

  removeImage(id: number) {
    console.log(id);
  }
}
