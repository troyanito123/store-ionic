import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { ProductService } from '../settings/pages/products/services/product.service';
import { Product } from '../settings/pages/products/interfaces/interface';
import { SocketService } from '../shared/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  products: Product[] = [];

  productsSubs: Subscription;

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    private socketService: SocketService
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    await loading.present();
    this.productsSubs = this.productService
      .getProducts()
      .subscribe(async (products) => {
        await loading.dismiss();
        this.products = products;
      });
    this.socketService.listen('new-order').subscribe((res) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.productsSubs?.unsubscribe();
  }

  async createLoading() {
    return await this.loadingController.create({
      message: 'Cargando productos ...',
      backdropDismiss: false,
    });
  }

  logout() {
    this.authService.deleteUser();
    this.router.navigate(['auth']);
  }

  doRefresh(event: any) {
    this.productsSubs = this.productService
      .getProducts()
      .subscribe(async (products) => {
        this.products = products;
        event.target.complete();
      });
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  get isAuthenticate() {
    return this.authService.isAuthenticate;
  }
}
