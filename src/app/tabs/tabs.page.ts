import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  cantInCart = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cantInCart$.subscribe((cant) => (this.cantInCart = cant));
  }
}
