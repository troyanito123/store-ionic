import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  cantInCart = 0;

  private cantSubs: Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cantInCart = this.cartService.cantInCart;
    this.cantSubs = this.cartService.cantInCart$.subscribe(
      (cant) => (this.cantInCart = cant)
    );
  }

  ngOnDestroy() {
    this.cantSubs?.unsubscribe();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  get isAuthenticate() {
    return this.authService.isAuthenticate;
  }
}
