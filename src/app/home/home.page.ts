import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/services/cart.service';
import { Product } from './interfaces/interface';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  products: Product[] = [];
  cantInCart = 0;

  cantSubs: Subscription;
  productsSubs: Subscription;

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    await loading.present();
    this.cantInCart = this.cartService.cantInCart;
    this.cantSubs = this.cartService.cantInCart$.subscribe(
      (cant) => (this.cantInCart = cant)
    );
    this.productsSubs = this.productService
      .getProducts()
      .subscribe(async (products) => {
        await loading.dismiss();
        this.products = products;
        console.log(products);
      });
  }

  ngOnDestroy() {
    this.cantSubs?.unsubscribe();
    this.productsSubs?.unsubscribe();
  }

  async createLoading() {
    return await this.loadingController.create({
      message: 'Cargando productos ...',
      backdropDismiss: false,
    });
  }
}
