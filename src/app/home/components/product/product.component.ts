import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor() {}

  ngOnInit() {}

  addToCart() {
    console.log(`Agregando el producto ${this.product.id}`);
  }

  removeToCart() {
    console.log(`Quitando el producto ${this.product.id}`);
  }
}
