import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/interfaces/interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {
  @Input() product: Product;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  increase() {
    this.cartService.increaseCant(this.product.id);
  }

  decrease() {
    this.cartService.decreaseCant(this.product.id);
  }

  removeFromCart() {
    this.cartService.removeProductFromCart(this.product.id);
  }
}
