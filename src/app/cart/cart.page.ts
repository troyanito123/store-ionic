import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../settings/pages/products/interfaces/interface';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  products: Product[] = [];
  cost = 0;

  costSub: Subscription;
  deleteProductFromCartSubs: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.products = this.cartService.cart;
    this.cost = this.cartService.costCart;
    this.costSub = this.cartService.costOfCart$.subscribe((cost) => {
      this.cost = cost;
    });

    this.deleteProductFromCartSubs = this.cartService.deleteProductFromCart$.subscribe(
      (id) => {
        this.products = this.products.filter((p) => p.id !== id);
      }
    );
  }

  ngOnDestroy() {
    this.costSub?.unsubscribe();
    this.deleteProductFromCartSubs?.unsubscribe();
  }
}
