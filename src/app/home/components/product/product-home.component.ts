import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/services/cart.service';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  @Input() product: Product;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeToCart() {
    this.cartService.removeToCart(this.product.id);
  }
}
