import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { ProductService } from '../settings/pages/products/services/product.service';
import { Product } from '../settings/pages/products/interfaces/interface';
import { SocketService } from '../shared/services/socket.service';
import { UtilsService } from '../shared/services/utils.service';

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
    private authService: AuthService,
    private router: Router,
    private socketService: SocketService,
    private utilsService: UtilsService
  ) {}

  async ngOnInit() {
    const loading = await this.utilsService.createLoading();
    loading.present();
    this.productsSubs = this.productService
      .getProducts()
      .subscribe(async (products) => {
        loading.dismiss();
        this.products = products;
      });
    this.socketService.listen('new-order').subscribe((res) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.productsSubs?.unsubscribe();
  }

  async logout() {
    const loading = await this.utilsService.createLoading('saliendo ...');
    loading.present();
    this.authService.updatedPushId('no-push-id').subscribe(() => {
      loading.dismiss();
      this.authService.deleteUser();
      this.router.navigate(['auth/login']);
    });
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
